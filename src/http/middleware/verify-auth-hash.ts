import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeGetPreUsersUseCase } from '../../services/factories/make-get-preusers.use-case'
import { AuthorizationTokenNotFoundError } from '../../services/errors/authorization-token-not-found.error'
import { NonStandartTokenRecievedError } from '../../services/errors/non-standart-token-recieved.error'
import { UnauthorizedUserError } from '../../services/errors/unauthorized-user.error'
import { compareSync } from 'bcryptjs'
import { prisma } from '../../lib/prisma'

export async function verifyHash(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { token } = request.headers

    if (!token || token === undefined) {
      throw new AuthorizationTokenNotFoundError()
    }

    const users = await prisma.preUser.findMany() // TODO get all users use case

    const matchedUsers = users.filter((user) =>
      compareSync(user.email, token as string),
    )

    if (matchedUsers.length > 0) {
      const getPreUserByEmail = MakeGetPreUsersUseCase()
      const user = await getPreUserByEmail.execute(matchedUsers[0].email)
      request.preUser = user.user
    } else {
      throw new UnauthorizedUserError()
    }
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
