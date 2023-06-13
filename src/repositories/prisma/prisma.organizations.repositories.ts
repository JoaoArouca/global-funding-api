import { Organization } from '@prisma/client'
import { OrgRepository } from '../organizations.repositories'
import { prisma } from '../../lib/prisma'

export class PrismaOrganizationRepository implements OrgRepository {
  async findByName(name: string): Promise<Organization | null> {
    const org = await prisma.organization.findFirst({
      where: {
        name,
      },
    })

    return org
  }
}
