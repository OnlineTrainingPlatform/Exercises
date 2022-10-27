function isValidQuery(input: string): boolean {
  // the input should be trimmed and if we have a whitespace
  //   then the property (p or r) is missing.
  if (input.endsWith(' ')) {
    return false;
  }

  // Validation property: "E<> p"
  if (input.startsWith('E<> ')) {
    return true;
  }

  // Safety property: "A[] p"
  if (input.startsWith('A[] ')) {
    return true;
  }

  // Safety property: "E[] p"
  if (input.startsWith('E[] ')) {
    return true;
  }

  // Liveness property: "A<> p"
  if (input.startsWith('A<> ')) {
    return true;
  }

  // Liveness property (Bounded liveness can also be expressed here): "p -> r"
  if (input.split('->').length == 2) {
    return true;
  }

  return false;
}

export class Query {
  private readonly _query: string;

  constructor(query: string) {
    query = query.trim();
    if (!isValidQuery(query)) {
      throw new Error(`${query} is not a valid UPPAAL query`);
    }

    this._query = query;
  }

  get query(): string {
    return this._query;
  }
}
