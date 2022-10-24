export class Exercise {
  private readonly _id: string;
  private readonly _title: string;
  private readonly _description: string;

  constructor(id: string, title: string, description: string) {
    this._id = id;
    this._title = title;
    this._description = description;
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
}
