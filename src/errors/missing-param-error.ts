import { ErrorPort } from '@src/ports'

export class MissingParamError extends Error implements ErrorPort {
  private readonly _statusCode: number
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
    this._statusCode = 400
  }

  getStatusCode(): number {
    return this._statusCode
  }
}
