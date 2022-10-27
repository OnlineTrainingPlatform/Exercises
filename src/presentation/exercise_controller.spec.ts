import fastify from 'fastify';
import { mock } from 'jest-mock-extended';
import { exerciseController } from './exercise_controller';
import { Exercise, IExerciseRepository } from '../domain';
import { v4 as uuidv4 } from 'uuid';

describe('/exercises', () => {
  it('Status 200', async () => {
    const server = fastify();
    const repository = mock<IExerciseRepository>();
    server.register(exerciseController, {
      exerciseRepository: repository,
    });
    const exercise = new Exercise(uuidv4(), 'title', 'description', []);
    const exercises = [exercise];

    repository.getExercises.mockReturnValue(Promise.resolve(exercises));

    const response = await server.inject().get('/exercises');

    expect(response.statusCode).toBe(200);
  });
});
