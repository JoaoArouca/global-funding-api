import { FastifyInstance } from 'fastify'
import { FundingController } from './controllers/funding/funding.controller'
import { verifyHash } from './middleware/verify-auth-hash'

export async function appRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyHash)

  app.post('/funding', FundingController)
}
