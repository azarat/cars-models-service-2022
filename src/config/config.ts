import { SecretsManager } from 'aws-sdk'
import * as dotenv from 'dotenv'

dotenv.config()

class Config {
  private static readonly secrets = new SecretsManager({
    region: process.env.AWS_REGION,
  })

  private static readonly getSecret = async (
    secretName: string,
  ): Promise<string> => {
    const { SecretString } = await Config.secrets
      .getSecretValue({
        SecretId: process.env.SECRET_ID,
      })
      .promise()

    const secrets = JSON.parse(SecretString)
    return secrets[secretName]
  }

  readonly apiHost: string
  readonly port: string
  tableName: string
  projectId: string
  clientEmail: string
  clientId: string
  userSdkUrl: string
  userSdkSecret: string
  bqPrivateKey: string
  adminSecret: string

  constructor() {
    this.apiHost = process.env.API_HOST
    this.port = process.env.PORT
  }

  async init(): Promise<void> {
    this.tableName = await Config.getSecret('TABLE_NAME')
    this.projectId = await Config.getSecret('PROJECT_ID')
    this.clientEmail = await Config.getSecret('CLIENT_EMAIL')
    this.clientId = await Config.getSecret('CLIENT_ID')
    this.userSdkUrl = await Config.getSecret('USER_SDK_URL')
    this.userSdkSecret = await Config.getSecret('USER_SDK_SECRET')
    this.adminSecret = await Config.getSecret('ADMIN_SECRET')
    this.bqPrivateKey = await Config.getSecret('BQ_PRIVATE_KEY')
  }
}

export default new Config()
