import { Request, Response } from 'express'
import { ControllerPort } from '@src/ports'

export class LoginExpressAdapter {
  constructor(private readonly controller: ControllerPort) {}

  handle = async ({ body, params, query }: Request, res: Response) => {
    try {
      const result = await this.controller.execute({
        data: {
          ...body,
          ...params,
          ...query
        }
      })

      return res.status(result.statusCode).json(result?.responseBody)
    } catch (error) {
      const statusCode = error.getStatusCode() ?? 500
      return res.status(statusCode).send(error.message)
    }
  }
}
