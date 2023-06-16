import { FastifyReply, FastifyRequest } from 'fastify'
import { Decrypt } from '../../utils/decrypt'
import { env } from '../../env'
import { MakeGetPreUsersUseCase } from '../../services/factories/make-get-preusers.use-case'
import { AuthorizationTokenNotFoundError } from '../../services/errors/authorization-token-not-found.error'
import { NonStandartTokenRecievedError } from '../../services/errors/non-standart-token-recieved.error'
import { UnauthorizedUserError } from '../../services/errors/unauthorized-user.error'

export async function verifyHash(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { token } = request.headers

    if (!token || token === undefined) {
      throw new AuthorizationTokenNotFoundError()
    }

    const decodeHash = Decrypt(token as string, env.HASH_KEY)

    if (!decodeHash) {
      throw new NonStandartTokenRecievedError()
    }

    const getPreUserByEmail = MakeGetPreUsersUseCase()

    const user = await getPreUserByEmail.execute(decodeHash)

    request.preUser = user.user
  } catch (error) {
    if (error instanceof AuthorizationTokenNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof NonStandartTokenRecievedError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof UnauthorizedUserError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}
