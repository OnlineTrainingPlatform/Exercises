import { Query } from './query';

describe('Constructor', () => {
  it('Invalid validation property query throws an error', () => {
    expect(() => new Query('E< >')).toThrow(Error);
    expect(() => new Query('E < >')).toThrow(Error);
    expect(() => new Query('E <>')).toThrow(Error);
    expect(() => new Query('E< > ')).toThrow(Error);
    expect(() => new Query('E < > ')).toThrow(Error);
    expect(() => new Query('E <> ')).toThrow(Error);
  }),
    it('Invalid safety property query throws an error', () => {
      expect(() => new Query('A[ ]')).toThrow(Error);
      expect(() => new Query('A [ ]')).toThrow(Error);
      expect(() => new Query('A []')).toThrow(Error);
      expect(() => new Query('A[ ] ')).toThrow(Error);
      expect(() => new Query('A [ ] ')).toThrow(Error);
      expect(() => new Query('A [] ')).toThrow(Error);
    }),
    it('Invalid safety property query throws an error', () => {
      expect(() => new Query('E[ ]')).toThrow(Error);
      expect(() => new Query('E [ ]')).toThrow(Error);
      expect(() => new Query('E []')).toThrow(Error);
      expect(() => new Query('E[ ] ')).toThrow(Error);
      expect(() => new Query('E [ ] ')).toThrow(Error);
      expect(() => new Query('E [] ')).toThrow(Error);
    }),
    it('Invalid liveness property query throws an error', () => {
      expect(() => new Query('A< >')).toThrow(Error);
      expect(() => new Query('A < >')).toThrow(Error);
      expect(() => new Query('A <>')).toThrow(Error);
      expect(() => new Query('A< > ')).toThrow(Error);
      expect(() => new Query('A < > ')).toThrow(Error);
      expect(() => new Query('A <> ')).toThrow(Error);
    }),
    it('Valid validation property', () => {
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
    it('Valid safety property', () => {
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
    it('Valid liveness property', () => {
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
