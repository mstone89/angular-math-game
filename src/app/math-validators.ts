import { AbstractControl } from '@angular/forms';

export class MathValidators {

    static addition(target: string, sourceOne: string, sourceTwo: string) {
        return (form: AbstractControl) => {
            const sum = form.value[target];
            const firstNumber = form.value[sourceOne];
            const secondNumber = form.value[sourceTwo];

            return firstNumber + secondNumber === parseInt(sum) ? null : { addition : true};
        }
    }

    static subtraction(target: string, sourceOne: string, sourceTwo: string) {
        return (form: AbstractControl) => {
            const difference = form.value[target];
            const firstNumber = form.value[sourceOne];
            const secondNumber = form.value[sourceTwo];

            return firstNumber - secondNumber === parseInt(difference) ? null : { subtraction : true};
        }
    }

    static multiplication(target: string, sourceOne: string, sourceTwo: string) {
        return (form: AbstractControl) => {
            const product = form.value[target];
            const firstNumber = form.value[sourceOne];
            const secondNumber = form.value[sourceTwo];

            return firstNumber * secondNumber === parseInt(product) ? null : { multiplication : true};
        }
    }
}
