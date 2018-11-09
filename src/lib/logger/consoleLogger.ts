import { Logger } from './logger';

export class ConsoleLogger extends Logger {
    public success(message: string): void {
        console.log(this.color(this.indentation + message, ForegroundColors.Green));
    }

    public failure(message: string): void {
        console.log(this.color(this.indentation + message, ForegroundColors.Red));
    }

    public info(message: string): void {
        console.log(this.indentation + message);
    }

    private color(message: string, color: string) {
        return color + message + ForegroundColors.Reset;
    }
}

enum ForegroundColors {
    Red = '\x1b[31m',
    Green = '\x1b[32m',
    Reset = '\x1b[0m'
}