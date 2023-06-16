export class UserNotFoundError extends Error {
  constructor() {
    super('User id not found.')
  }
}
