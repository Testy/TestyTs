import * as path from 'path';
import * as glob from 'glob';

export class TestsLoader {
    public async loadTests(patterns: string[]) {
        const files: Set<string> = new Set();
        for (const pattern of patterns) {
            const matches = await this.matchFiles(pattern);
            for (const file of matches) {
                files.add(path.resolve(process.cwd(), file));
            }
        }


        for (const file of files) {
            await import(file);
        }
    }

    private async matchFiles(pattern: string) {
        return new Promise<string[]>((resolve, reject) => {
            glob(pattern, (err, files) => {
                if (err) reject(err);
                resolve(files);
            });
        });
    }
}