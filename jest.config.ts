module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Corrigido aqui
  setupFilesAfterEnv: ['<rootDir>/.jest/setup-tests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/.jest/mock/fileMock.ts', 
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/.jest/mock/fileMock.ts', 
    '\\.(jpg|jpeg|png)$': '<rootDir>/.jest/mock/fileMock.ts',
    '\\.(css|less|scss|sass)-proxy$': 'identity-obj-proxy',
  },
};
