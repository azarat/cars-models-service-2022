import { FastifyRequest } from 'fastify'
import * as userSdk from '@day-drive/user-sdk/lib/cjs'

import HttpError from '../errors/http-error'
import config from '../config/config'

export const VerifyUserMiddleware = async (req: FastifyRequest): Promise<void> => {
  const { token } = req.headers
  if (!token) throw new HttpError('Provide token', 401)
  try {
    await userSdk.verifyUser(config.userSdkUrl, config.userSdkSecret, token as string)
  } catch (error) {
    throw new HttpError('Invalid token', 401)
  }
}
