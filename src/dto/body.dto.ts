export interface IFilter {
  url?: string
    year?: string
    mark?: string
    model?: string
    modelType?: string
    modification?: string
    'driveType.ru'?: string
    'driveType.ua'?: string
    'bodyType.ru'?: string
    'bodyType.ua'?: string
    capacityTechnical?: string
    'power.ru'?: string
    'power.ua'?: string
    'engineType.ru'?: string
    'engineType.ua'?: string
    numberOfValves?: string
    fuelType?: string
    fuelTypeUa?: string
    capacity?: string
    numberOfCylinders?: string
    yearStart?: string
    yearEnd?: string
}

export interface BodyDTO {
  type: string
  fields: string[]
  filter: IFilter
  unique: boolean
}

export interface FilterDTO {
  filterId?: number
}
