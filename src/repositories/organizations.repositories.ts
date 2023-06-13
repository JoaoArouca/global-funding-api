import { Organization } from '@prisma/client'

export interface OrgRepository {
  findByName(name: string): Promise<Organization | null>
}
