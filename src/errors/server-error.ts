import { ErrorPort } from '@src/ports'

export class ServerError extends Error implements ErrorPort {
  private readonly _statusCode: number
  constructor() {
    super('Internal Server Error')
    this.name = 'ServerError'
    this._statusCode = 500
  }

  getStatusCode(): number {
    return this._statusCode
  }
}
