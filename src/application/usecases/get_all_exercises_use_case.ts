import { Exercise, IExerciseRepository } from '../../domain';
import { IUseCase } from './i_use_case';

// eslint-disable-next-line
export interface IGetAllExercisesRequest {}

export interface IGetAllExercisesResponse {
  exercises: Exercise[];
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
      exercises: await this.repository.getExercises(),
    };
  }
}
