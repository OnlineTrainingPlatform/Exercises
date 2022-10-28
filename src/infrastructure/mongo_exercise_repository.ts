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

  constructor() {
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
      'mongodb://root:rootpassword@localhost:27017/?authMechanism=DEFAULT',
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

    const model = await this.exerciseModel.findOne({ id: id });
    if (model == null) {
      return undefined;
    }
    return Promise.resolve(this.convertModel(model));
  }
}
