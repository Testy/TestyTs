import { Logger, Color } from './logger';

export class ConsoleLogger extends Logger {
  private readonly reset = '\x1b[0m';

  public debug(message: string): void {
    console.log(this.indentation + message);
  }

  public info(message: string = ''): void {
    console.log(this.indentation + message);
  }

  public warn(message: string = ''): void {
    console.log(this.color(this.indentation + message, Color.Yellow));
  }

  public error(message: string = ''): void {
    console.log(this.color(this.indentation + message, Color.Red));
  }

  public color(message: string, color: Color) {
    switch (color) {
      case Color.Green:
        return ForegroundColors.Green + message + this.reset;

      case Color.Yellow:
        return ForegroundColors.Yellow + message + this.reset;

      case Color.Red:
        return ForegroundColors.Red + message + this.reset;

      case Color.Grey:
        return ForegroundColors.Grey + message + this.reset;

      default:
        return message + this.reset;
    }
  }
}

enum ForegroundColors {
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[93m',
  Grey = '\x1b[90m',
}
