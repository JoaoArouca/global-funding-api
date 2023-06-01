import { OrganizationUncheckedCreateInput } from 'prisma'
import { prisma } from '../lib/prisma'

interface IOrganizationsService {
  getOrganizationsByName(
    orgs: string[],
  ): Promise<OrganizationUncheckedCreateInput[]>
}

export class OrganizationsService implements IOrganizationsService {
  async getOrganizationsByName(
    orgs: string[],
  ): Promise<OrganizationUncheckedCreateInput[]> {
    const orgsList = await Promise.all(
      orgs.map(async (org) => {
        const orgData = await prisma.organization.findFirst({
          where: {
            name: org,
          },
          select: {
            id: true,
            name: true,
          },
        })
        return orgData
      }),
    )

    const list = orgsList.filter((org) => org !== null)

    return list
  }
}
