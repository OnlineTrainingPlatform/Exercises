import { Exercise, IExerciseRepository } from '../domain';

export class MongoExerciseRepository implements IExerciseRepository {
  private readonly exercises: Exercise[] = [];

  constructor() {
    this.exercises = [
      new Exercise(
        '2ff1b6ba-5823-4551-9827-0d669da4b6fd',
        'Hello, World! Nope',
        'This exrcise will cover...',
        [],
      ),
      new Exercise(
        '7ad52ef0-34f0-4d59-b9ff-94eca3ca7558',
        'Doom',
        'This is brutal...',
        [],
      ),
    ];
  }

  public async getExercises(): Promise<Exercise[]> {
    return this.exercises;
  }

  public async getExerciseById(id: string): Promise<Exercise | undefined> {
    const exercise = this.exercises.find((value) => {
      return value.id == id;
    });

    return Promise.resolve(exercise);
  }
}
