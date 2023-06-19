import { Prisma, funding } from '@prisma/client'

export interface FundingRepository {
  findByKey(hash: string): Promise<funding | null>
  create(data: Prisma.fundingCreateInput): Promise<funding>
  getById(id: string): Promise<funding | null>
  getAll(): Promise<funding[] | null>
}
