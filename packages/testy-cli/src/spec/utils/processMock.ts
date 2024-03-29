import { expect } from '../../lib/assertion/expect';

export interface ProcessMock extends NodeJS.Process {
  expectSuccess(): void;
  expectFailure(): void;
}

export function getProcessMock(): ProcessMock {
  const process = {
    exitCode: 0,
    expectSuccess() {
      expect.toBeEqual(this.exitCode, 0);
    },
    expectFailure(exitCode: number = 1) {
      expect.toBeEqual(this.exitCode, exitCode);
    },
  } as ProcessMock;

  process.expectSuccess = process.expectSuccess.bind(process);
  process.expectFailure = process.expectFailure.bind(process);

  return process;
}
