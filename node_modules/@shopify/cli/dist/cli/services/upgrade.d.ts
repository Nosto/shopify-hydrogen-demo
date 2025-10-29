interface UpgradeOptions {
    env: NodeJS.ProcessEnv;
}
export declare function upgrade(directory: string, currentVersion: string, { env }?: UpgradeOptions): Promise<void>;
export {};
