import { LoginNotifyMessageDTO, LoginRequestDTO } from '@src/dto'
import { GenerateEncryptedCodePort, NotifyTopicPort, UseCasePort } from '@src/ports'
import { LoginUseCase } from '../../src/usecases'

interface Sut {
  sut: UseCasePort<LoginRequestDTO, string>
  fixture: LoginRequestDTO
  generateEncryptedCodeStub: GenerateEncryptedCodePort
  notifyStub: NotifyTopicPort<LoginNotifyMessageDTO>
}

const makeFixture = (): LoginRequestDTO => ({
  email: 'any_email',
  password: 'any_password'
})

const makeGenerateEncryptedCodePort = () => {
  class GenerateEncryptedCodeStub implements GenerateEncryptedCodePort {
    execute(data: { toEncrypt: any, lifeTime: any }): string {
      return 'any_hashedString'
    }
  }
  return new GenerateEncryptedCodeStub()
}

const makeNotifyTopicPort = () => {
  class NotifyStub implements NotifyTopicPort<LoginNotifyMessageDTO> {
    async send(message: NotifyTopicPort.Params<LoginNotifyMessageDTO>) {}
  }
  return new NotifyStub()
}
const makeSut = (): Sut => {
  const fixture = makeFixture()
  const generateEncryptedCodeStub = makeGenerateEncryptedCodePort()
  const notifyStub = makeNotifyTopicPort()
  const sut = new LoginUseCase(generateEncryptedCodeStub, notifyStub)

  return {
    sut,
    fixture,
    generateEncryptedCodeStub,
    notifyStub
  }
}

describe('LoginUseCase', () => {
  test('should call encprytAdapter correctly', async () => {
    const { sut, fixture, generateEncryptedCodeStub } = makeSut()
    const testable = jest.spyOn(generateEncryptedCodeStub, 'execute')
    await sut.execute(fixture)
    expect(testable).toHaveBeenCalled()
    expect(testable).toHaveBeenCalledWith({
      toEncrypt: {
        ...fixture
      },
      lifeTime: 5000
    })
  })
  test('should return a hashed string', async () => {
    const { sut, fixture } = makeSut()

    const testable = await sut.execute(fixture)

    expect(testable.length).toBeGreaterThan(10)
  })

  test('should call notify port correctly', async () => {
    const { sut, fixture, notifyStub } = makeSut()

    const testable = jest.spyOn(notifyStub, 'send')

    await sut.execute(fixture)

    expect(testable).toHaveBeenCalled()
    expect(testable).toHaveBeenCalledWith(
      expect.objectContaining({
        topic: expect.any(String),
        message: {
          text: 'Login Effectuated',
          email: fixture.email,
          time: expect.any(Date)
        }
      })
    )
  })
})
