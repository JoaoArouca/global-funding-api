import { FastifyInstance } from 'fastify'
import { FundingController } from './controllers/funding/funding.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/funding', FundingController)
}
