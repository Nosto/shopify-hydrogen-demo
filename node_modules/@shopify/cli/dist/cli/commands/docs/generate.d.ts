import Command from '@shopify/cli-kit/node/base-command';
import { Command as oclifCommand } from '@oclif/core';
export type CommandWithMarkdown = oclifCommand.Loadable & {
    descriptionWithMarkdown?: string;
};
export interface CommandData {
    commandName: string;
    fileName: string;
    interfaceName: string;
    hasTopic: boolean;
    topic: string | undefined;
    hasFlags: boolean;
}
export default class DocsGenerate extends Command {
    static description: string;
    static hidden: boolean;
    run(): Promise<void>;
}
export declare function extractCommandData(command: CommandWithMarkdown): {
    commandName: string;
    fileName: string;
    interfaceName: string;
    hasTopic: boolean;
    topic: string | undefined;
    hasFlags: boolean;
};
export declare function writeCommandDocumentation(command: CommandWithMarkdown, { commandName, fileName, interfaceName, hasTopic, topic, hasFlags }: CommandData): Promise<void>;
export declare function writeCommandFlagInterface(command: oclifCommand.Loadable, { fileName, interfaceName }: CommandData): Promise<void>;
export declare function writeCommandUsageExampleFile(command: CommandWithMarkdown, { fileName, commandName }: CommandData): Promise<void>;
