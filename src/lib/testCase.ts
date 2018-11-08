export class TestCase {
    public args: any[];

    constructor(public name: string, ...args: any[]) {
        this.args = args;
    }
}