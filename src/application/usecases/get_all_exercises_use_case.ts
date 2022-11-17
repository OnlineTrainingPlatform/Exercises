import { Exercise, IExerciseRepository } from '../../domain';
import { IUseCase } from './i_use_case';

// eslint-disable-next-line
export interface IGetAllExercisesRequest {}

export interface IGetAllExercisesResponse {
  exercises: {
    id: string;
    title: string;
    description: string;
    queries: {
      query: string;
    }[];
  }[];
}

export class GetAllExercisesUseCase
  implements IUseCase<IGetAllExercisesRequest, IGetAllExercisesResponse>
{
  private readonly repository: IExerciseRepository;

  constructor(repository: IExerciseRepository) {
    this.repository = repository;
  }

  public async do(
    _: IGetAllExercisesRequest,
  ): Promise<IGetAllExercisesResponse> {
    return {
      exercises: (await this.repository.getExercises()).map((exercise) => {
        return {
          id: exercise.id,
          title: exercise.title,
          description: exercise.description,
          queries: exercise.queries.map((query) => {
            return { query: query.query };
          }),
        };
      }),
    };
  }
}
