export class FundingNotFoundError extends Error {
  constructor() {
    super('Funding not found.')
  }
}
