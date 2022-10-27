import fastify from 'fastify';
import { exerciseController } from './exercise_controller';

describe('/exercises', () => {
  it('Status 200', async () => {
    const server = fastify();
    server.register(exerciseController);

    const response = await server.inject().get('/exercises');

    console.log(response.body);

    expect(response.statusCode).toBe(200);
  });
});
