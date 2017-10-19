import { CordovaPlatform, IonicEnvironment } from '../../definitions';
export declare function getPlatforms(projectDir: string): Promise<CordovaPlatform[]>;
export declare function installPlatform(env: IonicEnvironment, platform: string): Promise<void>;
