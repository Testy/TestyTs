import { Logger } from '../../lib/logger/logger';

export class NullLogger extends Logger {
    public success(message: string): void { }

    public warn(message: string = ''): void { }

    public failure(message: string = ''): void { }

    public info(message: string = ''): void { }

    private color(message: string, color: string) { }
}