import { LoginController } from '@src/controllers'
import { makeValidateEmailFactory } from '../utils'
import { makeLoginUseCase } from '../usecases'

const makeLoginControllerFactory = (): LoginController =>
  new LoginController(makeValidateEmailFactory(), makeLoginUseCase())

export { makeLoginControllerFactory }
