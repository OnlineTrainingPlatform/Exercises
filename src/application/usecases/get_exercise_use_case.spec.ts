import { Exercise, IExerciseRepository } from '../../domain';
import { mock } from 'jest-mock-extended';
import { GetExerciseUseCase } from './';
import { v4 as uuidv4 } from 'uuid';

describe('do', () => {
  it('Mock repository', async () => {
    const repository = mock<IExerciseRepository>();
    const exercise = new Exercise(uuidv4(), 'title', 'desc', []);

    repository.getExerciseById.mockReturnValue(Promise.resolve(exercise));

    const exerciseUseCase = new GetExerciseUseCase(repository);

    const actual = await exerciseUseCase.do({ id: 'id123' });

    expect(actual).toEqual({ exercise });
  });
});
