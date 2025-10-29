import Command from '@shopify/cli-kit/node/base-command';
export default class ClearCache extends Command {
    static description: string;
    static hidden: boolean;
    run(): Promise<void>;
}
