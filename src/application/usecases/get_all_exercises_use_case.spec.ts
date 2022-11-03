import { Exercise, IExerciseRepository } from '../../domain';
import { mock } from 'jest-mock-extended';
import { GetAllExercisesUseCase } from './get_all_exercises_use_case';
import { v4 as uuidv4 } from 'uuid';

describe('do', () => {
  it('Should return an empty list of exercises if none were found', async () => {
    // Arrange
    const repository = mock<IExerciseRepository>();
    const exercisesUseCase = new GetAllExercisesUseCase(repository);

    // Mock
    repository.getExercises.mockResolvedValue([]);

    // Act
    const actual = await exercisesUseCase.do({});

    // Assert
    expect(actual.exercises).toEqual([]);
  }),
    it('Should return an empty list of exercises if none were found', async () => {
      // Arrange
      const repository = mock<IExerciseRepository>();
      const exercise = new Exercise(uuidv4(), 'title', 'desc', []);
      const exercisesUseCase = new GetAllExercisesUseCase(repository);

      // Mock
      repository.getExercises.mockResolvedValue([exercise]);

      // Act
      const actual = await exercisesUseCase.do({});

      // Assert
      expect(actual.exercises).toEqual([exercise]);
    });
});
