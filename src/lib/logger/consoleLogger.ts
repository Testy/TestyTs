import { TextDecoder } from 'util';
import { Logger, Color, TextDecoration } from './logger';

export class ConsoleLogger extends Logger {
  private readonly reset = '\x1b[0m';

  public debug(message: string): void {
    console.log(this.indentation + message);
  }

  public info(message: string = ''): void {
    console.log(this.indentation + message);
  }

  public warn(message: string = ''): void {
    console.log(this.format(this.indentation + message, Color.Yellow));
  }

  public error(message: string = ''): void {
    console.log(this.format(this.indentation + message, Color.Red));
  }

  public format(message: string, color: Color, textDecorations: TextDecoration[] = []): string {
    const colorCode = this.getColorCode(color);
    const textDecorationsCodes = textDecorations.map((x) => this.getTextDecorationCode(x));

    return message
      .split(' ')
      .map((x) => colorCode + textDecorationsCodes.join() + x + this.reset)
      .join(' ');
  }

  private getColorCode(color: Color) {
    switch (color) {
      case Color.Black:
        return ForegroundColorCodes.Black;

      case Color.Green:
        return ForegroundColorCodes.Green;

      case Color.Yellow:
        return ForegroundColorCodes.Yellow;

      case Color.Red:
        return ForegroundColorCodes.Red;

      case Color.Grey:
        return ForegroundColorCodes.Grey;

      case Color.LightGrey:
        return ForegroundColorCodes.LightGrey;

      default:
        return '';
    }
  }

  private getTextDecorationCode(textDecoration: TextDecoration) {
    switch (textDecoration) {
      case TextDecoration.Bold:
        return TextDecorationsCodes.Bold;

      default:
        return '';
    }
  }
}

enum TextDecorationsCodes {
  Bold = '\x1b[1m',
}

enum ForegroundColorCodes {
  Black = '\x1b[30m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[93m',
  Grey = '\x1b[90m',
  LightGrey = '\x1b[37m',
}
