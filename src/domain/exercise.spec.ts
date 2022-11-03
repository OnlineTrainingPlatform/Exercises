import { v4 as uuidv4 } from 'uuid';
import { Exercise } from './exercise';
import { Query } from './query';

describe('Constructor', () => {
  it('Throws an error if the id is not a uuidv4', () => {
    expect(() => new Exercise('asd', 'a', 'a', [])).toThrow(Error);
  }),
    it('Throws an error if the title string is empty', () => {
      // Assert
      expect(() => new Exercise(uuidv4(), '', 'a', [])).toThrow(Error);
    }),
    it('Throws an error if the description string is empty', () => {
      // Assert
      expect(() => new Exercise(uuidv4(), 'a', '', [])).toThrow(Error);
    }),
    it('Create an exercise with no queries', () => {
      // Arrange
      const expected_id = uuidv4();
      const expected_title = 'title';
      const expected_description = 'description';
      const expected_queries: Query[] = [];

      // Act
      const exercise = new Exercise(
        expected_id,
        expected_title,
        expected_description,
        expected_queries,
      );

      // Assert
      expect(exercise.id).toBe(expected_id);
      expect(exercise.title).toBe(expected_title);
      expect(exercise.description).toBe(expected_description);
      expect(exercise.queries).toBe(expected_queries);
    }),
    it('Create an exercise with one queries', () => {
      // Arrange
      const expected_id = uuidv4();
      const expected_title = 'title';
      const expected_description = 'description';
      const expected_queries: Query[] = [new Query('E<> Something.Idle')];

      // Act
      const exercise = new Exercise(
        expected_id,
        expected_title,
        expected_description,
        expected_queries,
      );

      // Assert
      expect(exercise.id).toBe(expected_id);
      expect(exercise.title).toBe(expected_title);
      expect(exercise.description).toBe(expected_description);
      expect(exercise.queries).toBe(expected_queries);
    });
});
