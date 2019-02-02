import { Logger, Color } from '../../lib/logger/logger';

export class NullLogger extends Logger {
    debug(message?: string): void { }
    info(message?: string): void { }
    warn(message?: string): void { }
    error(message?: string): void { }
    color(message: string, color: Color): void { }
}