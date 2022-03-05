import { GenerateEncryptedCodeCryptoAdapter } from '@src/adapters/generateEncryptedCodeCrypto.adapter'

const makeGenerateEncryptedCodeCryptoAdapterfactory = (): GenerateEncryptedCodeCryptoAdapter =>
  new GenerateEncryptedCodeCryptoAdapter()

export { makeGenerateEncryptedCodeCryptoAdapterfactory }
