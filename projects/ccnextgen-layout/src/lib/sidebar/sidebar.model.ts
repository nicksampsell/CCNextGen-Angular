export class SidebarItem {
    icon:string | null = null;
    title:string | null = null;
    route:string | null = null;
    isHR:boolean = false;


    constructor(title:string, route:string, icon:string|null = null, isHR:boolean = false)
    {
        this.title = title;
        this.route = route;
        this.icon = icon;
        this.isHR = isHR;
    }
}