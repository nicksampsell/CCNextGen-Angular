export interface AppConfig {
    apiBaseUrl: string;
    featureFlags?: { [key:string]:boolean }
    appTitle?:string;
    logo?:string;
    
}