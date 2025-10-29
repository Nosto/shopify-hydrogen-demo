import Command from '@shopify/cli-kit/node/base-command';
export default class Upgrade extends Command {
    static summary: string;
    static descriptionWithMarkdown: string;
    static description: string | undefined;
    run(): Promise<void>;
}
