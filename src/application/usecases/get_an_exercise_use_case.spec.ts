import { mock } from 'jest-mock-extended';
import {
  GetAnExerciseUseCase,
  IGetAnExerciseResponse,
} from './get_an_exercise_use_case';
import { v4 as uuidv4 } from 'uuid';
import { Exercise, IExerciseRepository } from '../../domain';

describe('do', () => {
  it('should return the exercise as the IDs match', async () => {
    // Arrange
    const repository = mock<IExerciseRepository>();
    const exercise = new Exercise(uuidv4(), 'title', 'desc', []);
    const exerciseUseCase = new GetAnExerciseUseCase(repository);
    const expected: IGetAnExerciseResponse = {
      exercise: {
        id: exercise.id,
        title: exercise.title,
        description: exercise.description,
        queries: exercise.queries.map((query) => {
          return { query: query.query };
        }),
      },
    };

    // Mock
    repository.getExerciseById.mockImplementation((id: string) => {
      if (id === exercise.id) {
        return Promise.resolve(exercise);
      }
      return Promise.resolve(undefined);
    });

    // Act
    const actual = await exerciseUseCase.do({ id: exercise.id });

    // Assert
    expect(actual).toEqual(expected);
  }),
    it('Should return undefined as the IDs did not match', async () => {
      // Arrange
      const repository = mock<IExerciseRepository>();
      const exercise = new Exercise(uuidv4(), 'title', 'desc', []);
      const exerciseUseCase = new GetAnExerciseUseCase(repository);

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
