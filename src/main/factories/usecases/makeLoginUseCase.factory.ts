import { LoginUseCase } from '../../../usecases'
import { makeGenerateEncryptedCodeCryptoAdapterfactory, makeNotifyKafkaAdapter } from '../adapters'

const makeLoginUseCase = () =>
  new LoginUseCase(makeGenerateEncryptedCodeCryptoAdapterfactory(), makeNotifyKafkaAdapter())

export { makeLoginUseCase }
