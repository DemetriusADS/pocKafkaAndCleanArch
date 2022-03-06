/* eslint-disable @typescript-eslint/no-misused-promises */
import { Express } from 'express'
import { makeLoginExpressAdapter } from '../factories/adapters/makeExpressAdapter.factory'

export const setupRoutes = (app: Express) => {
  app.post('/login', makeLoginExpressAdapter().handle)
}
