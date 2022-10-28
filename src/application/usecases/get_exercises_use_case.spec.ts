import { Exercise, IExerciseRepository } from '../../domain';
import { mock } from 'jest-mock-extended';
import { GetExercisesUseCase, IGetExercisesRequest } from './';
import { Query } from '../../domain/query';
import { v4 as uuidv4 } from 'uuid';

describe('do', () => {
  it('Get exercises with two queries', async () => {
    const repository = mock<IExerciseRepository>();
    const request = mock<IGetExercisesRequest>();

    const query: Query[] = [new Query('E[] Something.Idle')];
    const exercises = [
      new Exercise(uuidv4(), 'exercise1', 'desc1', query),
      new Exercise(uuidv4(), 'exercise2', 'desc2', query),
      new Exercise(uuidv4(), 'exercise3', 'desc3', query),
      new Exercise(uuidv4(), 'exercise4', 'desc4', query),
    ];
    const exerciseUsesCase = new GetExercisesUseCase(repository);

    repository.getExercises.mockReturnValue(Promise.resolve(exercises));
    const actual = await exerciseUsesCase.do({ request });

    expect(actual).toEqual({ exercises });
  });
});
