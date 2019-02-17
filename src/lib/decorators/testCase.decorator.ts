import { TestCaseInstance } from '../testCaseInstance';

export function TestCase(name, ...args: any[]) {
    return (target, key, descriptor) => {
        if (!target.__testCases) {
            target.__testCases = {};
        }

        if (!target.__testCases[key]) {
            target.__testCases[key] = [];
        }

        target.__testCases[key].push(new TestCaseInstance(name, ...args));
    };
}