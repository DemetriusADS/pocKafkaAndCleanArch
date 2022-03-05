export interface HttpPostPort {
  post: <T>(data: HttpPort.Params) => Promise<HttpPort.Result<T>>
}

export namespace HttpPort {
  export interface Params {
    uri: string
    headers: Object
    body?: Object
    notJson?: boolean
    qs?: string
    responseType?: 'arraybuffer' | 'document' | 'json' | 'text' | 'stream'
  }

  export interface UploadParams {
    uri: string
    headers: Object
    formData: Object
    notJson?: boolean
  }

  export interface Result<T> {
    statusCode: number
    requestHeaders: Object
    responseHeaders: Object
    responseBody?: T
  }
}
