import fastify from 'fastify';
import { mock } from 'jest-mock-extended';
import { exerciseController } from './exercise_controller';
import { Exercise, IExerciseRepository } from '../domain';
import { v4 as uuidv4 } from 'uuid';
import { IGetExerciseResponse, IGetExercisesResponse } from '../application';

describe('/exercises', () => {
  const server = fastify();
  const repository = mock<IExerciseRepository>();
  server.register(exerciseController, {
    exerciseRepository: repository,
  });

  it('Returns status 200 if we successfully get exercises', async () => {
    const exercise = new Exercise(uuidv4(), 'title', 'description', []);
    const exercises = [exercise];

    repository.getExercises.mockReturnValue(Promise.resolve(exercises));

    const response = await server.inject().get('/exercises');
    const payload = JSON.parse(response.payload) as IGetExercisesResponse;

    expect(response.statusCode).toBe(200);
    expect(payload.exercises).toEqual(exercises);
  }),
    it('Returns status 500 if an error is thrown by the repository', async () => {
      repository.getExercises.mockReturnValue(Promise.reject());

      const response = await server.inject().get('/exercises');

      expect(response.statusCode).toBe(500);
    });
});

describe('/exercises/:id', () => {
  const server = fastify();
  const repository = mock<IExerciseRepository>();
  server.register(exerciseController, {
    exerciseRepository: repository,
  });

  it('Returns status 200 if we found the exercise', async () => {
    const id = uuidv4();
    const exercise = new Exercise(id, 'title', 'description', []);

    repository.getExerciseById.mockReturnValue(Promise.resolve(exercise));

    const response = await server.inject(`/exercises/${id}`);
    const payload = JSON.parse(response.payload) as IGetExerciseResponse;

    expect(response.statusCode).toBe(200);
    expect(payload.exercise).toEqual(exercise);
  }),
    it('Returns status 400 if no id was given', async () => {
      const response = await server.inject('/exercises/');

      expect(response.statusCode).toBe(400);
    });
});
