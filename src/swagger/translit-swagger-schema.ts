const translitSwaggerSchema = {
  tags: ['cars'],
  headers: {
    token: {
      type: 'string',
    },
  },
  body: {
    type: 'object',
    properties: {
      type: { type: 'string', description: 'get-modification' },
      fields: {
        type: 'array',
        description: 'array with fields',
        example: ['url', 'year', 'mark', 'model', 'modelType', 'modification', 'driveType.ru', 'driveType.ua', 'bodyType.ru', 'bodyType.ua', 'capacityTechnical', 'power.ru', 'power.ua', 'engineType.ru', 'engineType.ua', 'numberOfValves', 'fuelType', 'fuelTypeUa', 'capacity', 'numberOfCylinders', 'yearStart', 'yearEnd'],
      },
      filter: { type: 'object', description: 'conditions' },
      unique: { type: 'boolean', description: 'if true select unique values(DISTINCT), default value true' },
    },
    example: {
      type: 'get-modification',
      fields: ['mark', 'model', 'year'],
      filter: {
        year: '2019',
        'engineType.ru': 'Бензин',
      },
      unique: true,
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          url: { type: 'string' },
          year: { type: 'string' },
          mark: {
            type: 'object',
            properties: {
              latinMark: { type: 'string' },
              cyrillicMark: { type: 'string' },
            },
          },
          model: { type: 'string' },
          modelType: { type: 'string' },
          modification: { type: 'string' },
          driveType: { type: 'string' },
          bodyType: { type: 'string' },
          capacityTechnical: { type: 'string' },
          power: { type: 'string' },
          engineType: { type: 'string' },
          numberOfValves: { type: 'string' },
          fuelType: { type: 'string' },
          fuelTypeUa: { type: 'string' },
          capacity: { type: 'string' },
          numberOfCylinders: { type: 'string' },
          yearStart: { type: 'string' },
          yearEnd: { type: 'string' },
        },
      }
    },
  },
}

export default translitSwaggerSchema