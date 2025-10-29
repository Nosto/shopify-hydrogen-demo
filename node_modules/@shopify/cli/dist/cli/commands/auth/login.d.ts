import Command from '@shopify/cli-kit/node/base-command';
export default class Login extends Command {
    static description: string;
    static flags: {
        alias: import("@oclif/core/interfaces").OptionFlag<string | undefined, import("@oclif/core/interfaces").CustomOptions>;
    };
    run(): Promise<void>;
}
