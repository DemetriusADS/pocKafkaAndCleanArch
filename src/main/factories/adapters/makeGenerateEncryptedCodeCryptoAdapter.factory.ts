import { GenerateEncryptedCodeCryptoAdapter } from '@src/adapters'

const makeGenerateEncryptedCodeCryptoAdapterfactory = (): GenerateEncryptedCodeCryptoAdapter =>
  new GenerateEncryptedCodeCryptoAdapter()

export { makeGenerateEncryptedCodeCryptoAdapterfactory }
