import Command from '@shopify/cli-kit/node/base-command';
export default class CommandFlags extends Command {
    static description: string;
    static hidden: boolean;
    static flags: {
        csv: import("@oclif/core/interfaces").BooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
