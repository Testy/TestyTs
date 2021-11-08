import { Logger } from '../../lib/logger/logger';

export class NullLogger extends Logger {
  debug(): void {
    return;
  }

  info(): void {
    return;
  }

  warn(): void {
    return;
  }

  error(): void {
    return;
  }

  format(message: string): string {
    return message;
  }

  create() {
    return new NullLogger();
  }
}
