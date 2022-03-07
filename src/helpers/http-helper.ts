import { HttpPort } from '@src/ports'
import { ServerError } from '../errors'

export const badRequest = (error: Error): HttpPort.Result => ({
  statusCode: 400,
  responseBody: error
})

export const serverError = (): HttpPort.Result => ({
  statusCode: 500,
  responseBody: new ServerError()
})

export const ok = (data: any): HttpPort.Result => ({
  statusCode: 200,
  responseBody: data
})
