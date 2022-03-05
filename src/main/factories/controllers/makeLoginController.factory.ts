import { LoginController } from '@src/controllers'
import { makeValidateEmailFactory } from '../utils'
import { makeGenerateEncryptedCodeCryptoAdapterfactory } from '../adapters'

const makeLoginControllerFactory = (): LoginController =>
  new LoginController(makeValidateEmailFactory(), makeGenerateEncryptedCodeCryptoAdapterfactory())

export { makeLoginControllerFactory }
