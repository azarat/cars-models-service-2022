import fasify from 'fastify'
import swagger from 'fastify-swagger'

import swaggerConfig from './swagger/swagger-config'
import config from './config/config'
import HttpError from './errors/http-error'
import controller from './controller';

const app = fasify({ logger: true })

app.get(`/${config.apiEnv}/FuelService/health`, async () => 'Hello World')
app.register(swagger, swaggerConfig)

app.setErrorHandler((err, _, res) => {
  app.log.error(err)
  if (err instanceof HttpError) {
    res.status(err.code).send(err.message)
  } else {
    res.status(500).send(err.message)
  }
})
app.register(controller, { prefix: `/${config.apiEnv}/FuelService/` }); // or delete options?

const start = async () => {
  try {
    await config.init()
    await app.listen(config.port, '0.0.0.0')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
