export interface NotifyPort<T> {
  send: (message: T) => void
}
