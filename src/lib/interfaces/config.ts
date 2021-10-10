export interface TestyConfig {
  tsconfig?: string;
  include: string[];
  reporters?: { [name: string]: unknown };
  timeout?: number;
  setupFile?: string;

  /** @deprecated Use "reporters" instead. */
  reporter?: 'standard' | 'TAP';
}
