import Command from '@shopify/cli-kit/node/base-command';
/**
 * This command is used to output all the UI components of the CLI.
 * It's useful to test how they behave under different terminal sizes
 * and to help update the documentation when they change.
 */
export default class KitchenSinkAll extends Command {
    static description: string;
    static hiddenAliases: string[];
    static hidden: boolean;
    run(): Promise<void>;
}
