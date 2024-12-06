import { Directive, ElementRef, input, OnInit } from '@angular/core';

@Directive({
  selector: '[tilt]',
})
export class TiltDirective implements OnInit {
  tiltDegree = input(5);

  constructor(private element: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.element.nativeElement.addEventListener('mouseleave', () => {
      this.element.nativeElement.style.transform = 'rotate(0deg)';
    });

    this.element.nativeElement.addEventListener('mouseenter', event => {
      const pos = this.determineDirection(event.pageX);
      this.element.nativeElement.style.transform = `rotate(${pos === 0 ? `${this.tiltDegree()}deg` : `-${this.tiltDegree()}deg`})`;
    });
  }

  /**
   *
   * returns 0 if entered from left, 1 if entered from right
   */
  determineDirection(pos: number): 0 | 1 {
    const width = this.element.nativeElement.clientWidth;
    const middle =
      this.element.nativeElement.getBoundingClientRect().left + width / 2;
    return pos > middle ? 1 : 0;
  }
}
