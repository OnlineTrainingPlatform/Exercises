import fastify from 'fastify';
import { MongoExerciseRepository } from './infrastructure';
import { exerciseController } from './presentation';
import * as dotenv from 'dotenv'

dotenv.config();

const server = fastify();
server.register(exerciseController, {
  prefix: process.env.API_PREFIX,
  exerciseRepository: new MongoExerciseRepository(
    process.env.MONGO_CONNECTION_STRING,
    process.env.MONGO_DOCUMENT_NAME,
    process.env.MONGO_DB_NAME
  ),
});

server.listen({ port: process.env.PORT }, (err: any, address: any) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
