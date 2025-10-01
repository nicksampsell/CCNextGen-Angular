import { inject, Injectable, InjectionToken } from "@angular/core";
import { CCNEXTGEN_LAYOUT_CONFIG, CCNextGenConfig } from './config.token';

@Injectable({ providedIn: 'root'})
export class ConfigService {
    private readonly config = inject(CCNEXTGEN_LAYOUT_CONFIG, { optional: true });

    get apiBaseUrl(): string {
        return this.config?.apiBaseUrl ?? '';
    }

    get featureFlags(): { [key: string]: boolean } {
        return this.config?.featureFlags ?? {};
    }

    get appTitle(): string {
        return this.config?.appTitle ?? 'CCNextGen Application';
    }

    get logoUrl():string {
        return this.config?.logoUrl  ?? '/assets/ccnextgen-layout/cc_logo.png'
    }
}