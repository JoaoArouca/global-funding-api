import { CreateUserFundingResponsibleDTO } from '../http/DTO/create-user-funding-responsible-dto'
import { UserFundingResponsibleRepository } from '../repositories/user-funding-responsible.repositories'
import { MakeGetFundingByIdUseCase } from './factories/make-get-funding-by-id.use-case'
import { MakeGetUserByIdUseCase } from './factories/make-get-preuser-by-id.use-case'

export class CreateUserFundingResponsibleUseCase {
  constructor(
    private userfundingResponsible: UserFundingResponsibleRepository,
  ) {}

  async execute({ userId, fundingId }: CreateUserFundingResponsibleDTO) {
    const getUserByIdUseCase = MakeGetUserByIdUseCase()
    const getFundingByIdUseCase = MakeGetFundingByIdUseCase()

    const findUser = await getUserByIdUseCase.execute(userId)

    const findFunding = await getFundingByIdUseCase.execute(fundingId)

    await this.userfundingResponsible.create({
      preuser_id: {
        connect: { id: findUser.id },
      },
      funding_id: {
        connect: { id: findFunding.id },
      },
    })
  }
}
