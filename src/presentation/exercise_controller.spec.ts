import fastify from 'fastify';
import { mock } from 'jest-mock-extended';
import { exerciseController } from './exercise_controller';
import { Exercise, IExerciseRepository, Query } from '../domain';
import { v4 as uuidv4 } from 'uuid';
import { IGetAnExerciseResponse } from '../application';

describe('/exercises', () => {
  const server = fastify();
  const repository = mock<IExerciseRepository>();
  server.register(exerciseController, {
    exerciseRepository: repository,
  });

  it('Returns status 200 if we successfully get exercises', async () => {
    // Arrange
    const exercise = new Exercise(uuidv4(), 'title', 'description', [
      new Query('A<> something.idle'),
    ]);
    const exercises = [exercise];

    // Mock
    repository.getExercises.mockResolvedValue(exercises);

    // Act
    const response = await server.inject().get('/exercises');
    const payload = JSON.parse(response.payload);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(payload)).toBe(true);
    expect(typeof payload[0]).toBe('object');
    expect(typeof payload[0].id).toBe('string');
    expect(typeof payload[0].title).toBe('string');
    expect(typeof payload[0].description).toBe('string');
    expect(Array.isArray(payload[0].queries)).toBe(true);
    expect(typeof payload[0].queries[0].query).toBe('string');
  }),
    it('Returns status 500 if an error is thrown by the repository', async () => {
      // Mock
      repository.getExercises.mockImplementation(() => {
        throw new Error();
      });

      // Act
      const response = await server.inject().get('/exercises');

      // Assert
      expect(response.statusCode).toBe(500);
    }),
    it('Returns status 500 if the repository promise is rejected', async () => {
      // Mock
      repository.getExercises.mockRejectedValue(undefined);

      // Act
      const response = await server.inject().get('/exercises');

      // Assert
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
    // Arrange
    const id = uuidv4();
    const exercise = new Exercise(id, 'title', 'description', []);

    // Mock
    repository.getExerciseById.mockResolvedValue(exercise);

    // Act
    const response = await server.inject(`/exercises/${id}`);
    const payload = JSON.parse(response.payload);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(payload.exercise).toEqual(exercise);
  }),
    it('Returns status 400 if no id was given', async () => {
      // Act
      const response = await server.inject('/exercises/');

      // Assert
      expect(response.statusCode).toBe(400);
    }),
    it('Returns status 404 if no exercise could be found with the ID', async () => {
      // Mock
      repository.getExerciseById.mockResolvedValue(undefined);

      // Act
      const response = await server.inject('/exercises/some-id');

      // Assert
      expect(response.statusCode).toBe(404);
    }),
    it('Returns status 500 if repository throws an error', async () => {
      // Mock
      repository.getExerciseById.mockImplementation((id) => {
        throw new Error();
      });

      // Act
      const response = await server.inject('/exercises/some-id');

      // Assert
      expect(response.statusCode).toBe(500);
    }),
    it('Returns status 500 if repository promise was rejected', async () => {
      // Mock
      repository.getExerciseById.mockRejectedValue(undefined);

      // Act
      const response = await server.inject('/exercises/some-id');

      // Assert
      expect(response.statusCode).toBe(500);
    });
});
