import { PreUserRepository } from '../repositories/pre-users.repositories'
import { UnauthorizedUserError } from './errors/unauthorized-user.error'

export class GetPreUserByEmailUseCase {
  constructor(private preusersRepository: PreUserRepository) {}

  async execute(email: string) {
    const user = await this.preusersRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedUserError()
    }

    return { user }
  }
}
