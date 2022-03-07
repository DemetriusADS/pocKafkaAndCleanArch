import { ControllerPort, ForValidateEmailPort, HttpPort, UseCasePort } from '@src/ports'
import { LoginRequestDTO, LoginResponseDTO } from '@src/dto'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, ok, serverError } from '../helpers/http-helper'

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
          return badRequest(new MissingParamError(requiredParam))
        }
      }
      if (!this.isValidEmail.execute(data.email)) {
        return badRequest(new InvalidParamError('email'))
      }

      const token = await this.loginUseCase.execute(data)

      return ok({ token })
    } catch (error) {
      return serverError()
    }
  }
}
