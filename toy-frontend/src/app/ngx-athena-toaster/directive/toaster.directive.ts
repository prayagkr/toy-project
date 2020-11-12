import { Directive, ElementRef, Renderer2, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Directive({
  selector: '[appToaster]'
})
export class ToasterDirective implements OnInit {

  // tslint:disable-next-line: no-output-native
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  private delay: number = 5000;
  private animation: number = 2000;
  private timeoutVar;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    const div = this.el.nativeElement;
    this.setTimeOutForClose(div);

  }

  @HostListener('mouseover') onMouseOver() {
    const div = this.el.nativeElement;
    this.renderer.removeClass(div, 'fade-out');
    this.renderer.setStyle(div, 'opacity', '1');
    clearTimeout(this.timeoutVar);
  }

  @HostListener('mouseout') onMouseOut() {
    const div = this.el.nativeElement;
    this.renderer.addClass(div, 'fade-out');
    this.setTimeOutForClose(div);
  }

  setTimeOutForClose(div) {
    this.timeoutVar = setTimeout(() => {
      this.close.emit(null);
      this.renderer.setStyle(div, 'display', 'none');
    }, (this.delay + this.animation));
  }

}
