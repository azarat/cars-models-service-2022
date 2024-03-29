import config from "../config/config"

const swaggerCofig =  {
  exposeRoute: true,
  routePrefix: `/${config.apiEnv}/CarsModelService/docs`,
  swagger: {
    host: config.apiHost,
    info: {
      title: 'Cars service API',
      version: 'v1',
    },
  },
}

export default swaggerCofig