export enum Color {
  Black,
  Red,
  Green,
  Yellow,
  Grey,
  LightGrey,
}

export enum TextDecoration {
  Bold,
}

export abstract class Logger {
  private readonly indentationSize: number = 2;
  private indentationLevel: number = 0;

  protected get indentation() {
    return ' '.repeat(this.indentationSize * this.indentationLevel);
  }

  public increaseIndentation(): void {
    ++this.indentationLevel;
  }

  public decreaseIndentation(): void {
    --this.indentationLevel;
  }

  abstract debug(message?: string): void;
  abstract info(message?: string): void;
  abstract warn(message?: string): void;
  abstract error(message?: string): void;
  abstract format(message: string, color: Color, textDecorations?: TextDecoration[]): string;
  abstract create(): Logger;
}
