import { PrismaOrganizationRepository } from '../../repositories/prisma/prisma.organizations.repositories'
import { GetOrgsUseCase } from '../get-organizations.use-case'

export function MakeGetOrganizationsUseCase() {
  const prismaOrgRepository = new PrismaOrganizationRepository()
  const getOrgsUseCase = new GetOrgsUseCase(prismaOrgRepository)
  return getOrgsUseCase
}
