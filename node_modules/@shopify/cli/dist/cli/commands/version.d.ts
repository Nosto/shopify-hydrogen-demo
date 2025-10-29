import Command from '@shopify/cli-kit/node/base-command';
export default class Version extends Command {
    static description: string;
    run(): Promise<void>;
}
