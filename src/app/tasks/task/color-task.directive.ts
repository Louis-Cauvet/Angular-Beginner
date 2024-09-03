import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { taskStatus } from '../model/task';

@Directive({
  selector: '[colorTask]'
})

export class ColorTaskDirective implements OnChanges {
  @Input() colorTask!: taskStatus;

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    this.applyColor();
  }

  private applyColor(): void {
    let color: string;

    switch (this.colorTask) {
      case taskStatus.A_FAIRE:
        color = 'red';
        break;
      case taskStatus.EN_COURS:
        color = 'blue';
        break;
      case taskStatus.TERMINE:
        color = 'green';
        break;
      default:
        color = 'white';
    }

    this.el.nativeElement.style.color = color;
  }
}
