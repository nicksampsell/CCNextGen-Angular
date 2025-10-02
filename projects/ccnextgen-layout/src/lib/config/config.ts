import { InjectionToken, Provider } from "@angular/core";
import { AppConfig } from "./config.model";

export const CCNEXTGEN_LAYOUT_CONFIG = new InjectionToken<AppConfig>('CCNextGen Layout Config');

export function provideCCNextGenLayout(config: AppConfig): Provider {
    return {
        provide: CCNEXTGEN_LAYOUT_CONFIG,
        useValue: config
    };
}