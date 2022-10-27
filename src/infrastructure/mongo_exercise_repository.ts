import { v4 as uuidv4 } from 'uuid';
import { Exercise, IExerciseRepository } from '../domain';

export class MongoExerciseRepository implements IExerciseRepository {
  private readonly exercises: Exercise[] = [
    new Exercise(uuidv4(), 'Hello, World!', 'This exrcise will cover...', []),
    new Exercise(uuidv4(), 'Doom', 'This is brutal...', []),
  ];

  public async getExercises(): Promise<Exercise[]> {
    return this.exercises;
  }

  public async getExerciseById(id: string): Promise<Exercise> {
    const exercise = this.exercises.find((value) => value.id == id);
    if (exercise === undefined) {
      Promise.reject('Exercise not found');
    }
    return Promise.resolve(exercise!);
  }
}
