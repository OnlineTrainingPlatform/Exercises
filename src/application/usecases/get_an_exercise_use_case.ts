import { Exercise, IExerciseRepository } from '../../domain';
import { IUseCase } from './i_use_case';

export interface IGetAnExerciseRequest {
  id: string;
}

export interface IGetAnExerciseResponse {
  exercise: Exercise | undefined;
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
    return {
      exercise: await this.repository.getExerciseById(request.id),
    };
  }
}
