import { GenerateEncryptedCodeCryptoAdapter } from '../../src/adapters'

interface Sut {
  sut: GenerateEncryptedCodeCryptoAdapter
  fixture: { toEncrypt: any, lifeTime: any }
}
const makeSut = (): Sut => {
  const sut = new GenerateEncryptedCodeCryptoAdapter()
  const fixture = { toEncrypt: { data: 'teste' }, lifeTime: 3 }
  return { sut, fixture }
}
describe('Generate Encrypted Code using Crypto', () => {
  test('should return a hmacSh256 hash', () => {
    const { sut, fixture } = makeSut()
    const testable = sut.execute(fixture)
    expect(testable).toEqual('wgWbNVctIvdtx1WZj5jUSBNmZgydViGlm+PaUjf8cY4=')
  })
})
