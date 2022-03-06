import { LoginController } from '../../src/controllers'
import { InvalidParamError, MissingParamError } from '../../src/errors'
import { ForValidateEmailPort, GenerateEncryptedCodePort, HttpPort } from '@src/ports'
import { LoginRequestDTO } from '@src/dto'

interface Sut {
  sut: LoginController
  validateEmailStub: ForValidateEmailPort
  fixture: HttpPort.Params<LoginRequestDTO>
  generateEncryptedCodeStub: GenerateEncryptedCodePort
}

const makeValidateEmailStub = () => {
  class ValidateEmailStub implements ForValidateEmailPort {
    execute(email: string): boolean {
      return true
    }
  }

  return new ValidateEmailStub()
}

const makeGenerateEncryptedCodeStub = () => {
  class GenerateEncryptedCodeStub implements GenerateEncryptedCodePort {
    execute({ toEncrypt: any, lifeTime: number }: { toEncrypt: any, lifeTime: any }): string {
      return 'any_hashedToken'
    }
  }

  return new GenerateEncryptedCodeStub()
}

const makeSut = (): Sut => {
  const fixture = {
    data: {
      email: 'any_email@email.com',
      password: 'any_password'
    }
  }

  const generateEncryptedCodeStub = makeGenerateEncryptedCodeStub()
  const validateEmailStub = makeValidateEmailStub()
  const sut = new LoginController(validateEmailStub, generateEncryptedCodeStub)
  return { sut, validateEmailStub, fixture, generateEncryptedCodeStub }
}
describe('Login Controller', () => {
  test('should check if is a valid email', async () => {
    const { sut, validateEmailStub, fixture } = makeSut()

    const testable = jest.spyOn(validateEmailStub, 'execute')

    await sut.execute(fixture)

    expect(testable).toHaveBeenCalledWith(fixture.data.email)
  })
  test('should return status 400 if there is no email', async () => {
    try {
      const { sut, fixture, validateEmailStub } = makeSut()

      jest.spyOn(validateEmailStub, 'execute').mockImplementationOnce(() => false)

      throw await sut.execute(fixture)
    } catch (testable) {
      expect(testable).toEqual(new InvalidParamError('email'))
      expect(testable.getStatusCode()).toBe(400)
    }
  })
  test('should return status 400 if there is no password', async () => {
    try {
      const { sut } = makeSut()

      const fixture: any = {
        data: {
          email: 'any_email@email.com'
        }
      }

      throw await sut.execute(fixture)
    } catch (testable) {
      expect(testable).toEqual(new MissingParamError('password'))
      expect(testable.getStatusCode()).toBe(400)
    }
  })
  test('should return status 400 if there is invalid email', async () => {
    try {
      const { sut } = makeSut()

      const fixture: any = {
        data: {
          password: 'any_password'
        }
      }

      throw await sut.execute(fixture)
    } catch (testable) {
      expect(testable).toEqual(new MissingParamError('email'))
      expect(testable.getStatusCode()).toBe(400)
    }
  })
  test('should return a hash in token response', async () => {
    const { sut, fixture } = makeSut()

    const testable = await sut.execute(fixture)

    expect(testable.responseBody?.token.length).toBeGreaterThan(10)
    expect(testable.statusCode).toEqual(200)
  })
})
