import {
  IGetExerciseRequest,
  IGetExerciseResponse,
  IGetExercisesRequest,
  IGetExercisesResponse,
  GetExercisesUseCase,
  GetExerciseUseCase,
  IUseCase,
} from '..';
import { IExerciseRepository } from '../../domain';
import { MongoExerciseRepository } from '../../infrastructure';

export class User {
  private readonly getExercisesUseCase: IUseCase<
    IGetExercisesRequest,
    IGetExercisesResponse
  >;
  private readonly getExerciseUseCase: IUseCase<
    IGetExerciseRequest,
    IGetExerciseResponse
  >;

  constructor() {
    const repository: IExerciseRepository = new MongoExerciseRepository();
    this.getExercisesUseCase = new GetExercisesUseCase(repository);
    this.getExerciseUseCase = new GetExerciseUseCase(repository);
  }

  public async getExercises(
    request: IGetExercisesRequest,
    ): Promise<IGetExercisesResponse> {
    return this.getExercisesUseCase.do(request);
  }

  public async getExercise(
    request: IGetExerciseRequest,
  ): Promise<IGetExerciseResponse> {
    return this.getExerciseUseCase.do(request);
  }
}
