import { Exercise } from './exercise';

export interface IExerciseRepository {
  getExercises(): Promise<Exercise[]>;
  getExerciseById(id: string): Promise<Exercise>;
}
