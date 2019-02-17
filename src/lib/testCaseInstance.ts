export class TestCaseInstance {
    public args: any[];

    constructor(public name: string, ...args: any[]) {
        this.args = args;
    }
}