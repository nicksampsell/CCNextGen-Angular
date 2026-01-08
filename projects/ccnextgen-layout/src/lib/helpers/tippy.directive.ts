import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  AfterViewInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import tippy, { Instance, Props, Placement } from 'tippy.js';

@Directive({
  selector: '[ccTippy]',
  standalone: true
})
export class CcTippyDirective implements AfterViewInit, OnDestroy {
  /** String or ng-template */
  @Input('ccTippy') content!: string | TemplateRef<any>;

  /** Optional overrides */
  @Input() tippyPlacement: Placement = 'top';
  @Input() tippyTrigger: Props['trigger'] = 'mouseenter focus';
  @Input() tippyInteractive = true;
  @Input() tippyDelay: Props['delay'] = [100, 0];
  @Input() tippyDisabled = false;

  private instance?: Instance;
  private embeddedView?: any;

  constructor(
    private host: ElementRef<HTMLElement>,
    private vcr: ViewContainerRef
  ) {}

  ngAfterViewInit(): void {
    if (this.tippyDisabled) {
      return;
    }

    const content = this.resolveContent();

    this.instance = tippy(this.host.nativeElement, {
      content,
      placement: this.tippyPlacement,
      trigger: this.tippyTrigger,
      interactive: this.tippyInteractive,
      delay: this.tippyDelay,
      appendTo: () => document.body
    });
  }

  ngOnDestroy(): void {
    this.instance?.destroy();
    this.embeddedView?.destroy();
  }

  private resolveContent(): HTMLElement | string {
    if (this.content instanceof TemplateRef) {
      this.embeddedView = this.vcr.createEmbeddedView(this.content);
      this.embeddedView.detectChanges();

      const wrapper = document.createElement('div');
      this.embeddedView.rootNodes.forEach((node: any) =>
        wrapper.appendChild(node)
      );

      return wrapper;
    }

    return this.content;
  }
}
