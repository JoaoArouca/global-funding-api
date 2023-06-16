export class AuthorizationTokenNotFoundError extends Error {
  constructor() {
    super('Authorization token not found.')
  }
}
