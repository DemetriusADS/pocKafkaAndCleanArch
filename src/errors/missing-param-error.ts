import { ErrorPort } from '@src/ports'

export class MissingParamError extends Error implements ErrorPort {
  private readonly _statusCode: number
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }

  getStatusCode (): number {
    return this._statusCode
  }
}
