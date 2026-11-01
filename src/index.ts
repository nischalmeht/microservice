import mongoose from 'mongoose';
import app from './app';
import { env } from './config/env';

mongoose.set('debug', env.MONGOOSE_DEBUG);

const start = async () => {
  await mongoose.connect(env.MONGO_HOST);
  app.listen(env.PORT, () => {
    console.log(`Listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
  });
};

start().catch((error) => {
  console.error('Unable to start server:', error);
  process.exit(1);
});
