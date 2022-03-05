import { LoginController } from '../../src/controllers'
import { InvalidParamError, MissingParamError } from '../../src/errors'
import { ForValidateEmailPort, HttpPort } from '@src/ports'
import { LoginRequestDTO } from '@src/dto'

interface Sut {
  sut: LoginController
  validateEmail: ForValidateEmailPort
  fixture: HttpPort.Params<LoginRequestDTO>
}

const makeSut = (): Sut => {
  class ValidateEmail implements ForValidateEmailPort {
    execute(email: string): boolean {
      return true
    }
  }
  const fixture = {
    data: {
      email: 'any_email@email.com',
      password: 'any_password'
    }
  }
  const validateEmail = new ValidateEmail()
  const sut = new LoginController(validateEmail)
  return { sut, validateEmail, fixture }
}
describe('Login Controller', () => {
  test('should check if is a valid email', async () => {
    const { sut, validateEmail, fixture } = makeSut()

    const testable = jest.spyOn(validateEmail, 'execute')

    await sut.execute(fixture)

    expect(testable).toHaveBeenCalledWith(fixture.data.email)
  })
  test('should return status 400 if there is no email', async () => {
    try {
      const { sut, fixture, validateEmail } = makeSut()

      jest.spyOn(validateEmail, 'execute').mockImplementationOnce(() => false)

      await sut.execute(fixture)
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

      await sut.execute(fixture)
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

      await sut.execute(fixture)
    } catch (testable) {
      expect(testable).toEqual(new MissingParamError('email'))
      expect(testable.getStatusCode()).toBe(400)
    }
  })
})
