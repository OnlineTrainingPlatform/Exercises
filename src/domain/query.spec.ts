import { Query } from './query';

describe('Constructor', () => {
  it('Throws an error if the query is an invalid validation property', () => {
    // Assert
    expect(() => new Query('E< >')).toThrow(Error);
    expect(() => new Query('E < >')).toThrow(Error);
    expect(() => new Query('E <>')).toThrow(Error);
    expect(() => new Query('E< > ')).toThrow(Error);
    expect(() => new Query('E < > ')).toThrow(Error);
    expect(() => new Query('E <> ')).toThrow(Error);
  }),
    it('Throws an error if the query is an invalid safety property', () => {
      // Assert
      expect(() => new Query('A[ ]')).toThrow(Error);
      expect(() => new Query('A [ ]')).toThrow(Error);
      expect(() => new Query('A []')).toThrow(Error);
      expect(() => new Query('A[ ] ')).toThrow(Error);
      expect(() => new Query('A [ ] ')).toThrow(Error);
      expect(() => new Query('A [] ')).toThrow(Error);
    }),
    it('Throws an error if the query is an invalid safety property', () => {
      // Assert
      expect(() => new Query('E[ ]')).toThrow(Error);
      expect(() => new Query('E [ ]')).toThrow(Error);
      expect(() => new Query('E []')).toThrow(Error);
      expect(() => new Query('E[ ] ')).toThrow(Error);
      expect(() => new Query('E [ ] ')).toThrow(Error);
      expect(() => new Query('E [] ')).toThrow(Error);
    }),
    it('Throws an error if the query is an invalid liveness property', () => {
      // Assert
      expect(() => new Query('A< >')).toThrow(Error);
      expect(() => new Query('A < >')).toThrow(Error);
      expect(() => new Query('A <>')).toThrow(Error);
      expect(() => new Query('A< > ')).toThrow(Error);
      expect(() => new Query('A < > ')).toThrow(Error);
      expect(() => new Query('A <> ')).toThrow(Error);
    }),
    it('Throws an error if the query is an invalid validation property', () => {
      // Assert
      expect(new Query('E<> Something.Idle').query).toBe('E<> Something.Idle');
      expect(new Query(' E<> Something.Idle').query).toBe('E<> Something.Idle');
      expect(new Query('E<> Something.Idle ').query).toBe('E<> Something.Idle');
      expect(new Query('E<>  Something.Idle').query).toBe(
        'E<>  Something.Idle',
      );
      expect(new Query(' E<>  Something.Idle').query).toBe(
        'E<>  Something.Idle',
      );
      expect(new Query('E<>  Something.Idle ').query).toBe(
        'E<>  Something.Idle',
      );
    }),
    it('Throws an error if the query is an invalid safety property', () => {
      // Assert
      expect(new Query('A[] Something.Idle').query).toBe('A[] Something.Idle');
      expect(new Query(' A[] Something.Idle').query).toBe('A[] Something.Idle');
      expect(new Query('A[] Something.Idle ').query).toBe('A[] Something.Idle');
      expect(new Query('A[]  Something.Idle').query).toBe(
        'A[]  Something.Idle',
      );
      expect(new Query(' A[]  Something.Idle').query).toBe(
        'A[]  Something.Idle',
      );
      expect(new Query('A[]  Something.Idle ').query).toBe(
        'A[]  Something.Idle',
      );

      expect(new Query('E[] Something.Idle').query).toBe('E[] Something.Idle');
      expect(new Query(' E[] Something.Idle').query).toBe('E[] Something.Idle');
      expect(new Query('E[] Something.Idle ').query).toBe('E[] Something.Idle');
      expect(new Query('E[]  Something.Idle').query).toBe(
        'E[]  Something.Idle',
      );
      expect(new Query(' E[]  Something.Idle').query).toBe(
        'E[]  Something.Idle',
      );
      expect(new Query('E[]  Something.Idle ').query).toBe(
        'E[]  Something.Idle',
      );
    }),
    it('Throws an error if the query is an invalid liveness property', () => {
      // Assert
      expect(new Query('A<> Something.Idle').query).toBe('A<> Something.Idle');
      expect(new Query(' A<> Something.Idle').query).toBe('A<> Something.Idle');
      expect(new Query('A<> Something.Idle ').query).toBe('A<> Something.Idle');
      expect(new Query('A<>  Something.Idle').query).toBe(
        'A<>  Something.Idle',
      );
      expect(new Query(' A<>  Something.Idle').query).toBe(
        'A<>  Something.Idle',
      );
      expect(new Query('A<>  Something.Idle ').query).toBe(
        'A<>  Something.Idle',
      );
    });
});
