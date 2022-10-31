import { mock } from 'jest-mock-extended';
import { GetExerciseUseCase } from './get_exercise_use_case';
import { v4 as uuidv4 } from 'uuid';
import { Exercise, IExerciseRepository } from '@domain';

describe('do', () => {
  it('should return the exercise as the IDs match', async () => {
    // Arrange
    const repository = mock<IExerciseRepository>();
    const expected = new Exercise(uuidv4(), 'title', 'desc', []);
    const exerciseUseCase = new GetExerciseUseCase(repository);

    // Mock
    repository.getExerciseById.mockImplementation((id: string) => {
      if (id === expected.id) {
        return Promise.resolve(expected);
      }
      return Promise.resolve(undefined);
    });

    // Act
    const actual = await exerciseUseCase.do({ id: expected.id });

    // Assert
    expect(actual).toEqual({ exercise: expected });
  }),
    it('should return undefined as the IDs did not match', async () => {
      // Arrange
      const repository = mock<IExerciseRepository>();
      const exercise = new Exercise(uuidv4(), 'title', 'desc', []);
      const exerciseUseCase = new GetExerciseUseCase(repository);

      // Mock
      repository.getExerciseById.mockImplementation((id: string) => {
        if (id === exercise.id) {
          return Promise.resolve(exercise);
        }
        return Promise.resolve(undefined);
      });

      // Act
      const actual = await exerciseUseCase.do({ id: 'An incorrect it' });

      // Assert
      expect(actual.exercise).toBe(undefined);
    });
});
