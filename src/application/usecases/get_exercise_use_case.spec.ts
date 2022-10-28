import { Exercise, IExerciseRepository } from '../../domain';
import { mock } from 'jest-mock-extended';
import { GetExerciseUseCase } from './';
import { v4 as uuidv4 } from 'uuid';

describe('do', () => {
  it('should return the exercise as the IDs match', async () => {
    const repository = mock<IExerciseRepository>();
    const exercise = new Exercise(uuidv4(), 'title', 'desc', []);
    const exerciseUseCase = new GetExerciseUseCase(repository);

    repository.getExerciseById.mockImplementation((id: string) => {
      if (id === exercise.id) {
        return Promise.resolve(exercise);
      }
      return Promise.resolve(undefined);
    });

    const actual = await exerciseUseCase.do({ id: exercise.id });

    expect(actual).toEqual({ exercise });
  }),
    it('should return undefined as the IDs did not match', async () => {
      const repository = mock<IExerciseRepository>();
      const exercise = new Exercise(uuidv4(), 'title', 'desc', []);
      const exerciseUseCase = new GetExerciseUseCase(repository);

      repository.getExerciseById.mockImplementation((id: string) => {
        if (id === exercise.id) {
          return Promise.resolve(exercise);
        }
        return Promise.resolve(undefined);
      });

      const actual = await exerciseUseCase.do({ id: 'An incorrect it' });

      expect(actual.exercise).toBe(undefined);
    });
});
