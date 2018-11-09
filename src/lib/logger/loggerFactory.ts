import { Logger } from './logger';
import { ConsoleLogger } from './consoleLogger';

export class LoggerFactory {
    public static create(): Logger {
        return new ConsoleLogger();
    }
}