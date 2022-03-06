import express from 'express'
import { setupRoutes } from './setup'

console.log('teste')
const app = express()
app.use(express.json())
setupRoutes(app)

export { app }
