export enum Color { Red, Green, Yellow, Grey }

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
    abstract color(message: string, color: Color): void;
}