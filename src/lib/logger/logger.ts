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

    abstract success(message: string): void;
    abstract failure(message: string): void;
    abstract info(message: string): void;
}