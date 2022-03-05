import { createHmac } from 'crypto'
import { GenerateEncryptedCodePort } from '@src/ports'

export class GenerateEncryptedCodeCryptoAdapter implements GenerateEncryptedCodePort {
  execute(data: { toEncrypt: any, lifeTime: any }): string {
    const secret = 'um secret aqui'
    return createHmac('sha256', secret).update(JSON.stringify({ data })).digest('base64')
  }
}
