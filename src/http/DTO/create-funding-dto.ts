interface Attribute {
  id: string
}

type AttributeList = Attribute[]

export interface CreateFundingDTO {
  hashKey: string
  title: string
  institution: string
  program: string | null
  call: string | null
  supportType: string
  requiresPartner: string
  TRLmin: string
  TRLmax: string
  term: string
  minValue: string
  maxValue: string
  supportTax: string
  duration: string
  tax: string
  shortage: string
  amortization: string
  isESG: boolean
  link: string
  status: string
  lastRelease: string
  objective: string | null
  elegibility: string | null
  expenses: string | null
  observation: string | null
  countriesInput: AttributeList
  regionInput: AttributeList
  orgsInput: AttributeList
  sectorInput: AttributeList
  partnersInput: AttributeList
  techInput: AttributeList
  responsibleId: string
}
