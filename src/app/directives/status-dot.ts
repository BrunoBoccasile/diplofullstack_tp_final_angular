import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appStatusDot]'
})
export class StatusDotDirective implements OnChanges {

  @Input('appStatusDot') isOnline?: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('isOnline' in changes) {
      this.updateDot();
    }
  }

  private updateDot() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'inline-block');
    this.renderer.setStyle(this.el.nativeElement, 'width', '10px');
    this.renderer.setStyle(this.el.nativeElement, 'height', '10px');
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '50%');

    const color = this.isOnline ? 'green' : 'red';
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}
