export interface TestyConfig {
    tsconfig?: string;
    include: string[];
    reporter?: 'standard' | 'TAP';
    timeout?: number;
}