export class ButtonModel {
    icon:string = '';
    route:string = '';
    title:string = '';
    color: 'default'|'primary'|'success'|'danger'|'warning'|'secondary' = 'default';
    colorAsOutline:boolean = false;
    showButton:boolean = true;

    constructor(icon:string, route:string, title:string, color:'default'|'primary'|'success'|'danger'|'warning'|'secondary' = 'default', colorAsOutline:boolean = false, showButton:boolean = true)
    {
        this.icon = icon;
        this.route = route;
        this.title = title;
        this.color = color == 'default' ? 'primary' : color;
        this.colorAsOutline = colorAsOutline;
        this.showButton = showButton;
    }
}