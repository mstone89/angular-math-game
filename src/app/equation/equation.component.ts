import { MathValidators } from './../math-validators';
import { Component, OnInit } from '@angular/core';
import { delay, filter, scan } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-equation',
    templateUrl: './equation.component.html',
    styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
    secondsPerSolution: number = 0;
    mathForm: FormGroup = new FormGroup(
        {
            valueOne: new FormControl(this.randomNumber()),
            valueTwo: new FormControl(this.randomNumber()),
            answer: new FormControl('')
        },
        [
            MathValidators.addition('answer', 'valueOne', 'valueTwo')
        ]
    );

    constructor() { }

    get valueOne(): number {
        return this.mathForm.value.valueOne;
    }

    get valueTwo(): number {
        return this.mathForm.value.valueTwo;
    }

    ngOnInit() {
        this.mathForm.statusChanges
            .pipe(
                filter(value => value === 'VALID'),
                delay(100),
                scan((acc) => {
                    return {
                        numberSolved: acc.numberSolved + 1,
                        startTime: acc.startTime
                    };
                }, { numberSolved: 0, startTime: new Date() })
            )
            .subscribe(({ numberSolved, startTime}) => {
                this.secondsPerSolution = (
                    new Date().getTime() - startTime.getTime()
                ) / numberSolved / 1000;

                this.mathForm.setValue({
                    valueOne: this.randomNumber(),
                    valueTwo: this.randomNumber(),
                    answer: ''
                });
        });
    }

    randomNumber(): number {
        return Math.floor(Math.random() * 10);
    }
}
