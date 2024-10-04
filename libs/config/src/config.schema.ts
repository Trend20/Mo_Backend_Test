import 'dotenv/config';
import * as Joi from '@hapi/joi';

export const environmentValidationSchema = Joi.object({
  // Mongo
  MONGO_DB_URL: Joi.string().required(),
  // Redis
  REDIS_HOST: Joi.string(),
  REDIS_PORT: Joi.number(),
  REDIS_PASSWORD: Joi.string().optional(),
});
