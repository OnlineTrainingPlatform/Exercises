import {
  IGetAnExerciseRequest,
  IGetAnExerciseResponse,
  IGetAllExercisesRequest,
  IGetAllExercisesResponse,
  GetAllExercisesUseCase,
  GetAnExerciseUseCase,
  IUseCase,
} from '..';
import { IExerciseRepository } from '../../domain';

export class User {
  private readonly getExercisesUseCase: IUseCase<
    IGetAllExercisesRequest,
    IGetAllExercisesResponse
  >;
  private readonly getExerciseUseCase: IUseCase<
    IGetAnExerciseRequest,
    IGetAnExerciseResponse
  >;

  constructor(repository: IExerciseRepository) {
    this.getExercisesUseCase = new GetAllExercisesUseCase(repository);
    this.getExerciseUseCase = new GetAnExerciseUseCase(repository);
  }

  public async getExercises(
    request: IGetAllExercisesRequest,
  ): Promise<IGetAllExercisesResponse> {
    return this.getExercisesUseCase.do(request);
  }

  public async getExercise(
    request: IGetAnExerciseRequest,
  ): Promise<IGetAnExerciseResponse> {
    return this.getExerciseUseCase.do(request);
  }
}
