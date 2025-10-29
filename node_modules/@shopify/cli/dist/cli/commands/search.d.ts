import Command from '@shopify/cli-kit/node/base-command';
export default class Search extends Command {
    static description: string;
    static usage: string;
    static examples: string[];
    static args: {
        query: import("@oclif/core/interfaces").Arg<string | undefined, Record<string, unknown>>;
    };
    run(): Promise<void>;
}
