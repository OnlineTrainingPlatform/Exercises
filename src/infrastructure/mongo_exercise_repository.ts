import { Exercise, IExerciseRepository } from '../domain';
import { Schema, model, connect, Model, Mongoose } from 'mongoose';

interface IExerciseDocument {
  id: string;
  title: string;
  description: string;
}

export class MongoExerciseRepository implements IExerciseRepository {
  private readonly exerciseSchmea: Schema<IExerciseDocument>;
  private readonly exerciseModel: Model<IExerciseDocument>;
  private mongoose: Mongoose | undefined = undefined;

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

    this.exerciseSchmea = new Schema<IExerciseDocument>({
      id: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
    });

    this.exerciseModel = model<IExerciseDocument>(
      'Exercise',
      this.exerciseSchmea,
    );
  }

  private convertModel(model: IExerciseDocument): Exercise {
    return new Exercise(model.id, model.title, model.description, []);
  }

  private convertModels(models: IExerciseDocument[]): Exercise[] {
    const exercises = [];
    for (const model of models) {
      exercises.push(this.convertModel(model));
    }
    return exercises;
  }

  private async connect(): Promise<Mongoose> {
    if (this.mongoose != undefined) {
      return Promise.resolve(this.mongoose);
    }

    return connect(
      'mongodb://root:eduroam@localhost:27017/?authMechanism=DEFAULT',
      {
        dbName: 'exercises',
        autoCreate: true,
      },
    );
  }

  public async getExercises(): Promise<Exercise[]> {
    await this.connect();

    const models = await this.exerciseModel.find({});
    if (models == null) {
      return Promise.reject(undefined);
    }

    return this.convertModels(models);
  }

  public async getExerciseById(id: string): Promise<Exercise | undefined> {
    await this.connect();
    const exercise = this.exercises.find((value) => {
      return value.id == id;
    });

    return Promise.resolve(exercise);
  }
}
