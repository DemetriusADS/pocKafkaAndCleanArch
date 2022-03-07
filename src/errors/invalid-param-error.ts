export class InvalidParamError extends Error {
  private readonly _statusCode: number
  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
