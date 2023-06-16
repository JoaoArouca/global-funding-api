import { PrismaPreUserRepository } from '../../repositories/prisma/prisma.pre-users.repositories'
import { GetPreUserByEmailUseCase } from '../get-preuser-by-email.use-case'

export function MakeGetPreUsersUseCase() {
  const prismaPreusersRepository = new PrismaPreUserRepository()
  const getPreusersByEmailUseCase = new GetPreUserByEmailUseCase(
    prismaPreusersRepository,
  )

  return getPreusersByEmailUseCase
}
