import { InjectionToken } from "@angular/core";

export interface CCNextGenConfig {
    apiBaseUrl: string;
    featureFlags?: { [key:string]:boolean }
    appTitle?:string;
    logoUrl?:string;
}

export const CCNEXTGEN_LAYOUT_CONFIG = new InjectionToken<CCNextGenConfig>('CCNextGenConfig');