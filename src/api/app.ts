import { readFileSync } from 'node:fs';

import express, { Express, Response } from 'express';
import helmet from 'helmet';
import * as swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';

const file = readFileSync('./openapi.yaml', 'utf8');
const openApiSpecification = YAML.parse(file);

const app: Express = express();
app.use(helmet());

app.use('/health', (_, response: Response) => response.sendStatus(200));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification));
app.get('/api/v1/dummy', (_, response: Response) =>
  response.status(200).json({}),
);

export default app;
