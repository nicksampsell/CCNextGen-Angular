export class SidebarItem {
    icon: string | null = null;
    title: string | null = null;
    route: string | null = null;
    isHR: boolean = false;

    constructor(
        titleOrIsHr: string | boolean,
        route?: string,
        icon?: string | null,
        isHR?: boolean
    ) {
        // If the first parameter is boolean and true, treat this as an HR item
        if (typeof titleOrIsHr === 'boolean' && titleOrIsHr === true) {
            this.isHR = true;
        } else {
            // Otherwise, treat it as a normal SidebarItem
            this.title = titleOrIsHr as string;
            this.route = route ?? null;
            this.icon = icon ?? null;
            this.isHR = isHR ?? false;
        }
    }
}