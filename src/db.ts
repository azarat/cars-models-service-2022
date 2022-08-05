import { BigQuery } from '@google-cloud/bigquery'

import config from './config/config'
import { IFilter } from './dto/body.dto'

class DB {
  private static bigQuery: BigQuery

  private constructor() { }

  static get bigQueryClient() {
    if (!DB.bigQuery) {
      DB.bigQuery = new BigQuery({
        projectId: config.projectId,
        credentials: {
          client_email: config.clientEmail,
          private_key:
            decodeURI(config.bqPrivateKey),
        },
        clientOptions: {
          clientId: config.clientId,
        },
      })
    }

    return DB.bigQuery
  }
}


const createWhereCondition = (filter: IFilter) => {
  if (!filter) return ''

  return `WHERE ${Object.keys(filter).reduce((acc, filterKey) => {
    if (filterKey === 'year') {
      return [
        ...acc,
        `safe_cast(yearStart AS INT64) <= ${filter[filterKey]} and CAST(
                  CASE
                        WHEN yearEnd = 'actual'
                          THEN '2021'
                        ELSE yearEnd
                  END AS INT64)  >= ${filter[filterKey]}`,
      ]
    }
    return [...acc, `${filterKey} = '${filter[filterKey].replace('\'', '\\\'')}'`]
  }, []).join(' AND ')}`
}

const getModification = async (fields: string[], filter: IFilter, unique: boolean) => {
  const [job] = await DB.bigQueryClient.createQueryJob({
    query: `
        SELECT ${unique ? 'DISTINCT' : ''} ${fields.join(', ')} 
        FROM \`${config.tableName}\`
        ${createWhereCondition(filter)}`,
    location: 'US',
  })

  const [rows] = await job.getQueryResults()
  return rows
}

export default getModification
