import { Exercise, IExerciseRepository, Query } from '../domain';
import { Schema, model, connect, Model } from 'mongoose';
import { v4 } from 'uuid';

interface IQuery {
  query: string;
}

interface IExerciseDocument {
  id: string;
  title: string;
  description: string;
  queries: IQuery[];
}

/**
 * A concrete implementation of the exercise repository interface
 */
export class MongoExerciseRepository implements IExerciseRepository {
  private readonly exerciseSchmea: Schema<IExerciseDocument>;
  private readonly exerciseModel: Model<IExerciseDocument>;

  /**
   * Construct a MongoDB repository from which we query exercises
   * @param connection The connection string to MongoDB
   * @param document_name The document name for exercises
   * @param database_name The database name for exercises
   */
  constructor(
    connection: string,
    document_name: string | undefined,
    database_name: string | undefined,
  ) {
    // Create the schema with the document rules
    this.exerciseSchmea = new Schema<IExerciseDocument>({
      id: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      queries: {},
    });

    // The model adhering to the document schema
    this.exerciseModel = model<IExerciseDocument>(
      document_name || 'Exercise',
      this.exerciseSchmea,
    );

    // Connecting to mongoose, this is async but querying from it will await a connection
    connect(connection, {
      dbName: database_name || 'exercises',
      autoCreate: true,
    });

    new this.exerciseModel({
      id: v4(),
      title: 'Title',
      description: 'Description',
      queries: [{ query: 'A<>  Something.Idle' }],
    }).save();
  }

  private documentToExercise(model: IExerciseDocument): Exercise {
    const queries: Query[] = [];
    if (model.queries != undefined) {
      for (const queryObj of model.queries) {
        queries.push(new Query(queryObj.query));
      }
    }

    return new Exercise(model.id, model.title, model.description, queries);
  }

  private documentsToExercises(models: IExerciseDocument[]): Exercise[] {
    const exercises = [];
    for (const model of models) {
      exercises.push(this.documentToExercise(model));
    }
    return exercises;
  }

  /**
   * @returns All exercises which are stored persistently in MonogDB
   */
  public async getExercises(): Promise<Exercise[]> {
    const models = await this.exerciseModel.find({});
    if (models == null) {
      return Promise.reject(undefined);
    }

    return this.documentsToExercises(models);
  }

  /**
   * Retrieves from MonogDB an exercise with a specific ID
   * @param id The ID of the exercise
   * @returns the exercise with the ID or undefined if it could not be found.
   */
  public async getExerciseById(id: string): Promise<Exercise | undefined> {
    const model = await this.exerciseModel.findOne({ id });
    if (model == null) {
      return Promise.resolve(undefined);
    }

    return Promise.resolve(this.documentToExercise(model));
  }
}
