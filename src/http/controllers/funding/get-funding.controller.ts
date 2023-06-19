import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeGetAllFundingUseCase } from '../../../services/factories/make-get-all-funding.use-case'

export async function GetAllFunding(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllFundingUseCase = MakeGetAllFundingUseCase()

    const fundingList = await getAllFundingUseCase.execute()

    return reply.status(200).send(fundingList)
  } catch (error) {
    return reply.status(500).send()
  }
}
