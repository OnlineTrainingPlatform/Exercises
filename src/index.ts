import fastify from 'fastify';
import { MongoExerciseRepository } from './infrastructure';
import { exerciseController, statusController } from './presentation';
import * as dotenv from 'dotenv'

const envResult = dotenv.config();
if (envResult.error != undefined) {
  console.log(`dotenv failed parsing the .env file ${envResult.error!}`)
  process.exit(1);
}

if (process.env.API_PREFIX == undefined) {
  console.log("Missing environment variable 'API_PREFIX'")
  process.exit(1);
}

if (process.env.MONGO_CONNECTION_STRING == undefined) {
  console.log("Missing environment variable 'MONGO_CONNECTION_STRING'")
  process.exit(1);
}

if (process.env.MONGO_DOCUMENT_NAME == undefined) {
  console.log("Missing environment variable 'MONGO_DOCUMENT_NAME'")
  process.exit(1);
}

if (process.env.MONGO_DB_NAME == undefined) {
  console.log("Missing environment variable 'MONGO_DB_NAME'")
  process.exit(1);
}

if (process.env.PORT == undefined) {
  console.log("Missing environment variable 'PORT'")
  process.exit(1);
}

const server = fastify();
server.register(exerciseController, {
  prefix: process.env.API_PREFIX,
  exerciseRepository: new MongoExerciseRepository(
    process.env.MONGO_CONNECTION_STRING!,
    process.env.MONGO_DOCUMENT_NAME,
    process.env.MONGO_DB_NAME
  ),
});
server.register(statusController, {
  prefix: process.env.API_PREFIX
})

server.listen({ port: Number(process.env.PORT) }, (err: any, address: any) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
