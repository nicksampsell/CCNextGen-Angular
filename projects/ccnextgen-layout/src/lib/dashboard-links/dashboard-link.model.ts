export class DashboardLinkModel {
    icon:string = '';
    route:string = '';
    title:string = '';
    showButton:boolean = true;
    onclick?: () => void;

    constructor(icon:string, route:string, title:string, showButton:boolean = true, onclick?:() => void)
    {
        this.icon = icon;
        this.route = route;
        this.title = title;
        this.showButton = showButton;
        this.onclick = onclick
    }
}