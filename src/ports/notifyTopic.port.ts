export interface NotifyTopicPort<T> {
  send: (data: NotifyTopicPort.Params<T>) => Promise<void>
}

export namespace NotifyTopicPort {
  export interface Params<T> {
    message: T
    topic: string
  }
}
