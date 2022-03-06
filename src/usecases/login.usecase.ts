import { LoginNotifyMessageDTO, LoginRequestDTO } from '@src/dto'
import { GenerateEncryptedCodePort, NotifyTopicPort, UseCasePort } from '@src/ports'

export class LoginUseCase implements UseCasePort<LoginRequestDTO, string> {
  constructor(
    private readonly generateEncryptedCodePort: GenerateEncryptedCodePort,
    private readonly notifyPort: NotifyTopicPort<LoginNotifyMessageDTO>
  ) {}

  async execute({ email, password }: LoginRequestDTO): Promise<string> {
    const token = this.generateEncryptedCodePort.execute({
      toEncrypt: {
        email,
        password
      },
      lifeTime: 5000
    })

    if (token) {
      await this.notifyPort.send({
        topic: 'topic-1',
        message: {
          email,
          text: 'Login Effectuated',
          time: new Date()
        }
      })
    }
    return token
  }
}
