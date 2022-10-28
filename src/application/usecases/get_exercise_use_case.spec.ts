import { Exercise, IExerciseRepository } from '../../domain';
import { mock } from 'jest-mock-extended';
import { GetExerciseUseCase } from './';
import { Query } from '../../domain/query';
import { v4 as uuidv4 } from 'uuid';

describe('do', () => {
  it('Get exercise with no query', async () => {
    const repository = mock<IExerciseRepository>();
    const query: Query[] = [];
    const expected_id = uuidv4();
    const exercise = new Exercise(expected_id, 'title', 'desc', query);
    const exercise_usecase = new GetExerciseUseCase(repository);

    repository.getExerciseById.mockReturnValue(Promise.resolve(exercise));
    const actual = await exercise_usecase.do({ id: expected_id });

    expect(actual).toEqual({ exercise });
  });
  it('Get exercise with one query', async () => {
    const repository = mock<IExerciseRepository>();
    const expected_id = uuidv4();
    const query: Query[] = [
      new Query('E[] Something.Idle'),
      new Query('E[] Something.Idle'),
    ];
    const exercise = new Exercise(expected_id, 'title', 'desc', query);
    const exerciseUseCase = new GetExerciseUseCase(repository);

    repository.getExerciseById.mockReturnValue(Promise.resolve(exercise));
    const actual = await exerciseUseCase.do({ id: expected_id });

    expect(actual).toEqual({ exercise });
  });
  it('Get exercise with two queries', async () => {
    const repository = mock<IExerciseRepository>();
    const expected_id = uuidv4();
    const query: Query[] = [new Query('E[] Something.Idle')];
    const exercise = new Exercise(expected_id, 'title', 'desc', query);
    const exerciseUseCase = new GetExerciseUseCase(repository);

    repository.getExerciseById.mockReturnValue(Promise.resolve(exercise));
    const actual = await exerciseUseCase.do({ id: expected_id });

    expect(actual).toEqual({ exercise });
  });
});
