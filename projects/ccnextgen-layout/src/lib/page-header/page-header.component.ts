import { Component, Input, OnChanges, OnInit, signal, TemplateRef, ViewEncapsulation } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ButtonModel } from './button.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


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
    constructor(private router: Router, private route: ActivatedRoute) {}

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

    navigate(button: ButtonModel) {
        const route = button.route?.trim();

        // 🔁 Known action types that usually come with an ID
        const knownActions = ['edit', 'details', 'delete', 'view', 'update', 'create'];

        // 🟡 If route is explicitly empty, navigate "up one level"
        if (!route) {
            const currentUrl = this.router.url.replace(/\/+$/, '');
            const segments = currentUrl.split('/').filter(Boolean); // Remove empty segments

            const last = segments[segments.length - 2]?.toLowerCase();
            const isKnownAction = knownActions.includes(last);
            const isLastSegmentId = !isNaN(Number(segments[segments.length - 1]));

            const baseSegments =
                isKnownAction && isLastSegmentId
                    ? segments.slice(0, -2) // Remove /action/:id
                    : segments.slice(0, -1); // Just remove last segment

            const newUrl = '/' + baseSegments.join('/');
            this.router.navigateByUrl(newUrl);
            return;
        }

        // 🟢 If not empty, do regular logic
        const isDefault = knownActions.includes(route.toLowerCase());

        if (!isDefault) {
            // Absolute or specific path
            this.router.navigate([route]);
        } else {
            // Handle smart relative routing (e.g., /edit/5)
            const currentUrl = this.router.url.replace(/\/+$/, '');
            const segments = currentUrl.split('/').filter(Boolean);

            const last = segments[segments.length - 2]?.toLowerCase();
            const isLastAction = knownActions.includes(last);
            const baseSegments =
                isLastAction && !isNaN(Number(segments[segments.length - 1]))
                    ? segments.slice(0, -2)
                    : segments;

            const newUrl = [...baseSegments, route];
            this.router.navigate(newUrl);
        }
    }

}