import { Exercise, IExerciseRepository } from '../../domain';
import { IUseCase } from './i_use_case';

export interface IGetExerciseRequest {
  id: string;
}

export interface IGetExerciseResponse {
  exercise: Exercise;
}

export class GetExerciseUseCase
  implements IUseCase<IGetExerciseRequest, IGetExerciseResponse>
{
  private readonly repository: IExerciseRepository;

  constructor(repository: IExerciseRepository) {
    this.repository = repository;
  }

  public async do(request: IGetExerciseRequest): Promise<IGetExerciseResponse> {
    return {
      exercise: await this.repository.getExerciseById(request.id),
    };
  }
}
