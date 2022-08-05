import { FastifyInstance } from 'fastify';

import getModification from './db'
import swaggerSchema from './swagger/swagger-schema'
import translitSwaggerSchema from './swagger/translit-swagger-schema'
import { Body, Headers } from './types'
import { VerifyUserMiddleware } from './middlewares/verify-user.middleware'
import { BodyDTO } from './dto/body.dto'
import { TokenHeader } from './dto/header.dto'
import { VerifySecretMiddleware } from './middlewares/verify-secret.middleware'
import service from './service'

const controller = (server: FastifyInstance, _, done) => {
  server.post<Headers<TokenHeader> & Body<BodyDTO>>(
    '/v2',
    {
      schema: translitSwaggerSchema,
      preValidation: VerifyUserMiddleware,
      handler: async (req) => await service.getCarsByFilterRetranslit(req.body)
    });
  server.post<Headers<TokenHeader> & Body<BodyDTO>>(
    '/',
    {
      schema: swaggerSchema,
      preValidation: VerifyUserMiddleware,
      handler: async (req) => await service.getCarsByFilter(req.body)
    });
  server.post<Headers<TokenHeader> & Body<BodyDTO>>(
    '/car',
    {
      schema: {
        ...swaggerSchema, headers: {
          secret: {
            type: 'string',
          },
        }
      },
      preValidation: VerifySecretMiddleware
    },
    async (request) => {
      const {
        type, fields, filter, unique = true,
      } = request.body
      if (type === 'get-modification') {
        return getModification(fields, filter, unique)
      }
      return {}
    })

  done();
};

export default controller;
