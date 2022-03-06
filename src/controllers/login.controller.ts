import { ControllerPort, ForValidateEmailPort, HttpPort, UseCasePort } from '@src/ports'
import { LoginRequestDTO, LoginResponseDTO } from '@src/dto'
import { InvalidParamError, MissingParamError, ServerError } from '../errors'

export class LoginController implements ControllerPort {
  constructor(
    private readonly isValidEmail: ForValidateEmailPort,
    private readonly loginUseCase: UseCasePort<LoginRequestDTO, string>
  ) {}

  async execute({
    data
  }: HttpPort.Params<LoginRequestDTO>): Promise<HttpPort.Result<LoginResponseDTO>> {
    try {
      const requiredParams = ['email', 'password']
      for (const requiredParam of requiredParams) {
        if (!data[requiredParam]) {
          throw new MissingParamError(requiredParam)
        }
      }
      if (!this.isValidEmail.execute(data.email)) {
        throw new InvalidParamError('email')
      }

      const token = await this.loginUseCase.execute(data)

      return await Promise.resolve({
        statusCode: 200,
        responseBody: {
          token
        }
      })
    } catch (error) {
      throw new ServerError(error.message)
    }
  }
}
