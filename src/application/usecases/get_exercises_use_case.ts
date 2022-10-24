import { IUseCase } from './i_use_case';
import { Exercise, IExerciseRepository } from '../../domain';

export interface IGetExercisesRequest {}

export interface IGetExercisesResponse {
  exercises: Exercise[];
}

export class GetExercisesUseCase
  implements IUseCase<IGetExercisesRequest, IGetExercisesResponse>
{
  private readonly repository: IExerciseRepository;

  constructor(repository: IExerciseRepository) {
    this.repository = repository;
  }

  public async do(_: IGetExercisesRequest): Promise<IGetExercisesResponse> {
    return {
      exercises: await this.repository.getExercises(),
    };
  }
}
