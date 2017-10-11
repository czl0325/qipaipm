import * as et from 'elementtree';
import { CordovaPlatform, ResourcesPlatform } from '../../definitions';
import { BaseConfig } from '../config';
export interface PlatformEngine {
    name: string;
    spec: string;
    [key: string]: string;
}
export interface CordovaPlatformsFile {
    ios?: string;
    android?: string;
    [key: string]: string | undefined;
}
export declare class CordovaPlatforms extends BaseConfig<CordovaPlatformsFile> {
    provideDefaults(o: any): Promise<any>;
    is(j: any): j is CordovaPlatformsFile;
    getPlatforms(): Promise<CordovaPlatform[]>;
}
export declare class ConfigXml {
    protected _filePath?: string;
    protected _doc?: et.ElementTree;
    protected saving: boolean;
    readonly doc: et.ElementTree;
    readonly filePath: string;
    static load(projectDir: string): Promise<ConfigXml>;
    save(): Promise<void>;
    saveSync(): void;
    /**
     * Update config.xml content src to be a dev server url. As part of this
     * backup the original content src for a reset to occur at a later time.
     */
    writeContentSrc(newSrc: string): void;
    /**
     * Set config.xml src url back to its original url
     */
    resetContentSrc(): void;
    getPreference(prefName: string): string | undefined;
    getProjectInfo(): {
        id: string;
        name: string;
        version: string;
    };
    getPlatformEngines(): PlatformEngine[];
    getPlatformEngine(platform: string): PlatformEngine | undefined;
    ensurePlatformImages(platform: string, resourcesPlatform: ResourcesPlatform): Promise<void>;
    ensureSplashScreenPreferences(): Promise<void>;
    protected write(): string;
    protected engineElementToPlatformEngine(engine: et.IElement): PlatformEngine;
}
