import { Directive, Renderer, ElementRef } from '@angular/core';

/**
 * Generated class for the FocuserDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[focuser]' // Attribute selector
})
export class FocuserDirective {

  constructor(private renderer:Renderer, private elementRef:ElementRef) {
    console.log('Hello FocuserDirective Directive');
  }
    ngAfterViewInit() {
        const element = this.elementRef.nativeElement.querySelector('input');
        setTimeout(() => {
            this.renderer.invokeElementMethod(element, 'focus', []);
        }, 0);
    }
}
