import { ErrorPort } from '@src/ports'

export class InvalidParamError extends Error implements ErrorPort {
  private readonly _statusCode: number
  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamError'
    this._statusCode = 400
  }

  getStatusCode(): number {
    return this._statusCode
  }
}
