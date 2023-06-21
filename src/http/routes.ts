import { FastifyInstance } from 'fastify'
import { FundingController } from './controllers/funding/funding.controller'
import { verifyHash } from './middleware/verify-auth-hash'
import { GetAllFunding } from './controllers/funding/get-funding.controller'
import { CreateManyFundingController } from './controllers/funding/create-many-funding.controller'

export async function appRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyHash)

  app.post('/funding', FundingController)

  app.get('/funding', GetAllFunding)

  app.post('/create-many/funding', CreateManyFundingController)
}
