import { pathsToModuleNameMapper } from 'ts-jest';
import 'tsconfig-paths/register';
import { compilerOptions } from './tsconfig.json';
import * as dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const jestConfig = {
  testTimeout: 10000,
  moduleFileExtensions: ['ts', 'js'],
  preset: 'ts-jest',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  globalSetup: '<rootDir>/test/global-setup.ts',
  globalTeardown: '<rootDir>/test/global-teardown.ts',
};

export default jestConfig;
