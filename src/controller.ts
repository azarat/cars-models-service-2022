import { FastifyInstance } from 'fastify';

import getModification from './db'
import swaggerSchema from './swagger/swagger-schema'
import translitSwaggerSchema from './swagger/translit-swagger-schema'
import { Body, Headers, Querystring } from './types'
import { VerifyUserMiddleware } from './middlewares/verify-user.middleware'
import { BodyDTO, FilterDTO } from './dto/body.dto'
import { TokenHeader } from './dto/header.dto'
import { VerifySecretMiddleware } from './middlewares/verify-secret.middleware'
import service from './service'
import repository from './repository';

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
    
  server.get<Headers<TokenHeader> & Body<FilterDTO>>(
    '/v2/makes',
    {
      preValidation: VerifySecretMiddleware
    },
    async (request) => {
      return repository.getMakes()
    })
  server.get<Headers<TokenHeader> & Querystring<FilterDTO>>(
    '/v2/models',
    {
      preValidation: VerifySecretMiddleware
    },
    async (request) => {
      const {
        filterId,
      } = request.query

      return repository.getModels(filterId)
    })
  server.get<Headers<TokenHeader> & Querystring<FilterDTO>>(
    '/v2/generaions',
    {
      preValidation: VerifySecretMiddleware
    },
    async (request) => {
      const {
        filterId,
      } = request.query

      return repository.getGeneraions(filterId)
    })

  server.get<Headers<TokenHeader> & Querystring<FilterDTO>>(
    '/v2/modifications',
    {
      preValidation: VerifySecretMiddleware
    },
    async (request) => {
      const {
        filterId,
      } = request.query

      return repository.getModifications(filterId)
    })

  done();
};

export default controller;
