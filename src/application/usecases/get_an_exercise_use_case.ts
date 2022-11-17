import { Exercise, IExerciseRepository } from '../../domain';
import { IUseCase } from './i_use_case';

export interface IGetAnExerciseRequest {
  id: string;
}

export interface IGetAnExerciseResponse {
  exercise:
    | {
        id: string;
        title: string;
        description: string;
        queries: {
          query: string;
        }[];
      }
    | undefined;
}

export class GetAnExerciseUseCase
  implements IUseCase<IGetAnExerciseRequest, IGetAnExerciseResponse>
{
  private readonly repository: IExerciseRepository;

  constructor(repository: IExerciseRepository) {
    this.repository = repository;
  }

  public async do(
    request: IGetAnExerciseRequest,
  ): Promise<IGetAnExerciseResponse> {
    const exercise = await this.repository.getExerciseById(request.id);
    if (exercise === undefined) {
      return { exercise: undefined };
    }

    return {
      exercise: {
        id: exercise.id,
        title: exercise.title,
        description: exercise.description,
        queries: exercise.queries.map((query) => {
          return { query: query.query };
        }),
      },
    };
  }
}
