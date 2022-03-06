import { GenerateEncryptedCodeCryptoAdapter } from '../../../adapters'

const makeGenerateEncryptedCodeCryptoAdapterfactory = (): GenerateEncryptedCodeCryptoAdapter =>
  new GenerateEncryptedCodeCryptoAdapter()

export { makeGenerateEncryptedCodeCryptoAdapterfactory }
