import { LoginExpressAdapter } from '../../../adapters'
import { makeLoginControllerFactory } from '../controllers'

export const makeLoginExpressAdapter = () => new LoginExpressAdapter(makeLoginControllerFactory())
