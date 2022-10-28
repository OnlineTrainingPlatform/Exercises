import { Exercise, IExerciseRepository } from '../../domain';
import { mock } from 'jest-mock-extended';
import { GetExercisesUseCase } from './';
import { v4 as uuidv4 } from 'uuid';

describe('do', () => {
    it('should return an empty list of exercises if non were found', async () => {
      const repository = mock<IExerciseRepository>();
      const exercisesUseCase = new GetExercisesUseCase(repository);
  
      repository.getExercises.mockResolvedValue([]);
  
      const actual = await exercisesUseCase.do({});
  
      expect(actual.exercises).toEqual([]);
    }),
    it('should return an empty list of exercises if non were found', async () => {
      const repository = mock<IExerciseRepository>();
      const exercise = new Exercise(uuidv4(), 'title', 'desc', []);
      const exercisesUseCase = new GetExercisesUseCase(repository);
  
      repository.getExercises.mockResolvedValue([ exercise ]);
  
      const actual = await exercisesUseCase.do({});
  
      expect(actual.exercises).toEqual([ exercise ]);
    });
});
