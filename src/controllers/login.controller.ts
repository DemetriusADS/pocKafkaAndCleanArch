import { ControllerPort, ForValidateEmailPort, HttpPort } from '@src/ports'
import { LoginRequestDTO, LoginResponseDTO } from '@src/dto'
import { InvalidParamError } from '../errors'

export class LoginController implements ControllerPort {
  constructor(private readonly isValidEmail: ForValidateEmailPort) {}
  async execute({
    data
  }: HttpPort.Params<LoginRequestDTO>): Promise<HttpPort.Result<LoginResponseDTO>> {
    if (!this.isValidEmail.execute(data.email)) {
      throw new InvalidParamError('email')
    }

    return await Promise.resolve({
      statusCode: 200,
      responseBody: {
        token: ''
      }
    })
  }
}
