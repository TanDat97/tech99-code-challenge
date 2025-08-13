import express, { Express, Request, Response } from 'express';
import logger from 'morgan';
import i18n, { __ } from 'i18n';
import cors from 'cors';
import bodyParser from 'body-parser';
import httpContext from 'express-http-context';
import configs from '@configs';
import { myDataSource } from '@database';
import { Routes } from './routes';
import { setupSwagger } from './configs/swagger';

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns service status and name
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is online
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Service online: express-typescript"
 */

const app: Express = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(i18n.init);
app.use(logger('dev'));
app.use(httpContext.middleware);

i18n.configure({
  locales: ['en', 'de', 'ar'],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
});

// Setup Swagger documentation
setupSwagger(app);

myDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization:', err);
  });

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    message: `Service online: ` + configs.server.app_name,
  });
});
app.get('/favicon.ico', (req, res) => res.status(204));

const routes = new Routes();
app.use('/api', routes.router);
app.use((error, req, res, next) => {
  console.log(error);
  const code = error.code || 500;
  const errorCode = error.errorCode || 500;
  if (code === 500 && !error.message) {
    error.message = 'Internal server error!';
  }
  res.status(code).send({ errorCode: errorCode, message: error.message || error });
});

const port = configs.server.port;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
  console.log(`📚 Swagger docs available at: http://localhost:${port}/api-docs`);
});
