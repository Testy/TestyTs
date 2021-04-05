import { Logger, Color } from '../../lib/logger/logger';

export class StringLogger extends Logger {
  public string: string = '';

  debug(message?: string): void {
    this.string += message + '\n';
  }

  info(message?: string): void {
    this.string += message + '\n';
  }

  warn(message?: string): void {
    this.string += message + '\n';
  }

  error(message?: string): void {
    this.string += message + '\n';
  }

  color(message: string, color: Color): void {
    this.string += message + '\n';
  }
}
