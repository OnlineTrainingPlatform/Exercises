import { Query } from './query';

function isUuidv4(input: string): boolean {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(input);
}

export class Exercise {
  private readonly _id: string;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _queries: Query[];

  constructor(
    id: string,
    title: string,
    description: string,
    queries: Query[],
  ) {
    if (!isUuidv4(id)) {
      throw new Error('Exercise id is not a UUID');
    }

    if (title.length < 1) {
      throw new Error('Exercise title is too short');
    }

    if (description.length < 1) {
      throw new Error('Exercise description is too short');
    }

    this._id = id;
    this._title = title;
    this._description = description;
    this._queries = queries;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get queries(): Query[] {
    return this._queries;
  }
}
