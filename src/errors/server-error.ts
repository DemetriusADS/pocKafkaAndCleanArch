import { ErrorPort } from '@src/ports'

export class ServerError extends Error implements ErrorPort {
  private readonly _statusCode: number
  private readonly _additionalInformation: string
  constructor(message: string) {
    super('Internal Server Error ' + message)
    this._additionalInformation = message
    this.name = 'ServerError'
    this._statusCode = 500
  }

  getStatusCode(): number {
    return this._statusCode
  }
}
