import { PrismaPreUserRepository } from '../../repositories/prisma/prisma.pre-users.repositories'
import { GetPreUserByIdUseCase } from '../get-preusers-by-id.use-case'

export function MakeGetUserByIdUseCase() {
  const prismaPreusersRepository = new PrismaPreUserRepository()
  const getPreusersByIdUseCase = new GetPreUserByIdUseCase(
    prismaPreusersRepository,
  )
  return getPreusersByIdUseCase
}
