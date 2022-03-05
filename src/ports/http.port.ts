export namespace HttpPort {
  export interface Params<T = any> {
    data: T
  }

  export interface Result<Y = any> {
    statusCode: number
    responseBody?: Y
  }
}
