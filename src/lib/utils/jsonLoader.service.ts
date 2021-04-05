import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import { readConfigFile } from 'typescript';

export class JsonLoader {
  /** Loads a JSON file. */
  public async load<T>(file: string): Promise<T> {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) throw new Error(`The specified configuration file could not be found: ${path}`);

    const config = readConfigFile(path, this.readFile);
    if (config?.error != null) {
      throw new Error(`An error occured while reading the configuration file ${path}`);
    }

    return config.config;
  }

  private readFile(path: string): string {
    return readFileSync(path).toString();
  }
}
