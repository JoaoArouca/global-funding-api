export class FundingAlreadyExistsError extends Error {
  constructor() {
    super('Funding already exists.')
  }
}
