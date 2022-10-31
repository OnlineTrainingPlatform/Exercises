module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: './src/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    "^@application": "<rootDir>/src/application/index",
    "^@actors": "<rootDir>/src/application/actors/index",
    "^@usecases": "<rootDir>/src/application/usecases/index",
    "^@domain": "<rootDir>/src/domain/index",
    "^@infrastructure": "<rootDir>/src/infrastructure/index",
    "^@presentation": "<rootDir>/src/presentation/index",
  }
};
