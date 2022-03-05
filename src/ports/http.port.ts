export namespace HttpPort{
  export type Request = {
    body?: any
    params?: string
    query?: any
  }
  export type Response<T> = {
    body?: T
  }
}