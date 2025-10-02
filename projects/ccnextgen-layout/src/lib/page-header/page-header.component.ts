import { Component, Input, OnChanges, OnInit, signal, TemplateRef, ViewEncapsulation } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ButtonModel } from './button.model';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'ccnextgen-header',
    templateUrl: './page-header.component.html',
    styleUrl: './page-header.component.css',
    standalone: true,
    imports: [CommonModule, RouterLink],
    encapsulation: ViewEncapsulation.None
})
export class PageHeader {
    @Input() titleLinkUrl?:string

    private _buttons: ButtonModel[] = [];


    @Input() set buttons(items: (ButtonModel | {
        icon:string;
        route:string;
        title:string;
        color?: 'default'|'primary'|'success'|'danger'|'warning'|'secondary'
        colorAsOutline?:boolean;
        showButton?:boolean })[]) {
        this._buttons = items.map(item =>
            item instanceof ButtonModel
            ? item
            : new ButtonModel(item.icon, item.route, item.title, item.color ?? 'primary', item.colorAsOutline ?? false, item.showButton ?? true)
        );
    }


    get getButtons(): ButtonModel[] {
        return this._buttons;
    }

    buttonClass(className:string, isOutline:boolean = false)
    {
        let btnClass = 'btn-';
        if(isOutline)
        {
            btnClass = btnClass + 'outline-';
        }
        return btnClass + className;
    }
}