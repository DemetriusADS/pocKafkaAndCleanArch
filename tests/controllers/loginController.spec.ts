import { LoginController } from '../../src/controllers'
import { InvalidParamError, MissingParamError } from '../../src/errors'
import { ForValidateEmailPort, HttpPort, UseCasePort } from '@src/ports'
import { LoginRequestDTO } from '@src/dto'

interface Sut {
  sut: LoginController
  validateEmailStub: ForValidateEmailPort
  fixture: HttpPort.Params<LoginRequestDTO>
  loginUseCaseStub: UseCasePort<LoginRequestDTO, string>
}

const makeValidateEmailStub = () => {
  class ValidateEmailStub implements ForValidateEmailPort {
    execute(email: string): boolean {
      return true
    }
  }

  return new ValidateEmailStub()
}

const makeLoginUseCaseStub = () => {
  class LoginUseCaseStub implements UseCasePort<LoginRequestDTO, string> {
    async execute(): Promise<string> {
      return await Promise.resolve('any_hashedToken')
    }
  }

  return new LoginUseCaseStub()
}

const makeSut = (): Sut => {
  const fixture = {
    data: {
      email: 'any_email@email.com',
      password: 'any_password'
    }
  }

  const loginUseCaseStub = makeLoginUseCaseStub()
  const validateEmailStub = makeValidateEmailStub()
  const sut = new LoginController(validateEmailStub, loginUseCaseStub)
  return { sut, validateEmailStub, fixture, loginUseCaseStub }
}
describe('Login Controller', () => {
  test('should check if is a valid email', async () => {
    const { sut, validateEmailStub, fixture } = makeSut()

    const testable = jest.spyOn(validateEmailStub, 'execute')

    await sut.execute(fixture)

    expect(testable).toHaveBeenCalledWith(fixture.data.email)
  })
  test('should return status 400 if there is no email', async () => {
    const { sut, fixture, validateEmailStub } = makeSut()

    jest.spyOn(validateEmailStub, 'execute').mockImplementationOnce(() => false)

    const testable = await sut.execute(fixture)
    expect(testable.responseBody).toEqual(new InvalidParamError('email'))
    expect(testable.statusCode).toBe(400)
  })
  test('should return status 400 if there is no password', async () => {
    const { sut } = makeSut()

    const fixture: any = {
      data: {
        email: 'any_email@email.com'
      }
    }

    const testable = await sut.execute(fixture)
    expect(testable.responseBody).toEqual(new MissingParamError('password'))
    expect(testable.statusCode).toBe(400)
  })
  test('should return status 400 if there is invalid email', async () => {
    const { sut } = makeSut()

    const fixture: any = {
      data: {
        password: 'any_password'
      }
    }

    const testable = await sut.execute(fixture)
    expect(testable.responseBody).toEqual(new MissingParamError('email'))
    expect(testable.statusCode).toBe(400)
  })
  test('should return a hash in token response', async () => {
    const { sut, fixture } = makeSut()

    const testable = await sut.execute(fixture)

    expect(testable.responseBody?.token.length).toBeGreaterThan(10)
    expect(testable.statusCode).toEqual(200)
  })

  test('should call loginUsecase with correct params', async () => {
    const { sut, loginUseCaseStub, fixture } = makeSut()
    const testable = jest.spyOn(loginUseCaseStub, 'execute')
    await sut.execute(fixture)

    expect(testable).toHaveBeenCalledWith(fixture.data)
  })
})
