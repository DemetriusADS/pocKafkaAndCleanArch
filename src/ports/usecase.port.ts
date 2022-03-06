export interface UseCasePort<T, Y> {
  execute: (data: T) => Promise<Y>
}
