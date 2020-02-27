import { Directive, ElementRef, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Directive({
    selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective implements OnInit {

    constructor(private element: ElementRef, private controlName: NgControl) { }

    ngOnInit() {
        this.controlName.control.parent.valueChanges
            .pipe(
                map(({valueOne, valueTwo, answer}) => {
                    return Math.abs(valueOne + valueTwo - answer) / (valueOne + valueTwo);
                })
            ).subscribe((value) => {
                if (value < 0.2) {
                    this.element.nativeElement.classList.add('close');
                } else {
                    this.element.nativeElement.classList.remove('close');
                }
            });
    }
}
