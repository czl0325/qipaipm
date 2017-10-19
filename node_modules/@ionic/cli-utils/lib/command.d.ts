import { CommandData, CommandLineInputs, CommandLineOptions, ICommand, IonicEnvironment } from '../definitions';
export declare function CommandMetadata(metadata: CommandData): (target: Function) => void;
export declare class Command implements ICommand {
    env: IonicEnvironment;
    metadata: CommandData;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    validate(inputs: CommandLineInputs): Promise<void>;
    execute(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    getCleanInputsForTelemetry(inputs: CommandLineInputs, options: CommandLineOptions): Promise<string[]>;
}
