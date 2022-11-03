import { Exercise, IExerciseRepository } from '../../domain';
import { mock } from 'jest-mock-extended';
import { GetExercisesUseCase } from './get_exercises_use_case';
import { v4 as uuidv4 } from 'uuid';

describe('do', () => {
  it('should return an empty list of exercises if none were found', async () => {
    // Arrange
    const repository = mock<IExerciseRepository>();
    const exercisesUseCase = new GetExercisesUseCase(repository);

    // Mock
    repository.getExercises.mockResolvedValue([]);

    // Act
    const actual = await exercisesUseCase.do({});

    // Assert
    expect(actual.exercises).toEqual([]);
  }),
    it('should return an empty list of exercises if non were found', async () => {
      // Arrange
      const repository = mock<IExerciseRepository>();
      const exercise = new Exercise(uuidv4(), 'title', 'desc', []);
      const exercisesUseCase = new GetExercisesUseCase(repository);

      // Mock
      repository.getExercises.mockResolvedValue([exercise]);

      // Act
      const actual = await exercisesUseCase.do({});

      // Assert
      expect(actual.exercises).toEqual([exercise]);
    });
});
