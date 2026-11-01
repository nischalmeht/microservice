import 'dotenv/config';
import Joi from 'joi';

interface EnvVars {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  MONGOOSE_DEBUG: boolean;
  JWT_SECRET: string;
  MONGO_HOST: string;
  AUTH_USERNAME: string;
  AUTH_PASSWORD: string;
}

const schema = Joi.object<EnvVars>({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  MONGOOSE_DEBUG: Joi.boolean().default(false),
  JWT_SECRET: Joi.string().min(16).required().description('Secret used to sign JWTs'),
  MONGO_HOST: Joi.string().required().description('MongoDB connection URI'),
  AUTH_USERNAME: Joi.string().required().description('Username accepted by POST /api/auth/login'),
  AUTH_PASSWORD: Joi.string().required().description('Password accepted by POST /api/auth/login'),
}).unknown();

const { error, value } = schema.validate(process.env, { abortEarly: false });
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env: EnvVars = value;
