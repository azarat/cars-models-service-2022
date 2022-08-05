import { FastifyRequest } from 'fastify'

import HttpError from '../errors/http-error'
import config from '../config/config'

export const VerifySecretMiddleware = async (req: FastifyRequest): Promise<void> => {
  const { secret } = req.headers
  if (!secret || secret !== config.adminSecret) throw new HttpError('Invalid secret', 401)
}
