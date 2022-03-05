import { HttpPort } from './http.port'

export interface ControllerPort {
  execute: (data: HttpPort.Params) => Promise<HttpPort.Result>
}
