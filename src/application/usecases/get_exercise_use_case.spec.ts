import { Exercise, IExerciseRepository } from '../../domain';
import { mock } from 'jest-mock-extended';
import {
  GetExerciseUseCase,
  IGetExerciseRequest,
  IGetExerciseResponse,
} from './';

describe('do', () => {
  it('Mock repository', async () => {
    const repository = mock<IExerciseRepository>();
    const exercise = new Exercise('id123', 'title', 'desc');

    repository.getExerciseById.mockReturnValue(Promise.resolve(exercise));

    const exerciseUseCase = new GetExerciseUseCase(repository);

    const actual = await exerciseUseCase.do({ id: 'id123' });

    expect(actual).toEqual({ exercise });
  });
});
