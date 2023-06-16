import { PreUserRepository } from '../repositories/pre-users.repositories'
import { UserNotFoundError } from './errors/user-not-found.error'

export class GetPreUserByIdUseCase {
  constructor(private preusersRepository: PreUserRepository) {}

  async execute(id: string) {
    const user = await this.preusersRepository.getById(id)

    if (!user) {
      throw new UserNotFoundError()
    }

    return user
  }
}
