import fastify from 'fastify';
import { MongoExerciseRepository } from './infrastructure';
import { exerciseController } from './presentation';

const server = fastify();
server.register(exerciseController, {
  prefix: '/api/v1',
  exerciseRepository: new MongoExerciseRepository()
});

server.listen({ port: 8080 }, (err: any, address: any) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
