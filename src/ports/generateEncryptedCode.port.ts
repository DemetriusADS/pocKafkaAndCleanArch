export interface GenerateEncryptedCodePort {
  execute: ({ toEncrypt: any, lifeTime: number }) => string
}
