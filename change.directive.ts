import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import { NgControl } from '@angular/forms';

import { Observable, of } from 'rxjs';

 

@Directive({

    selector: 'input[emailValidation]'

})

export class EmailValidationDirective {

 

    constructor(private elementRef: ElementRef, private ngControl: NgControl) { }

 

    onkeyup(val) {

        if (!(this.validateEmail(val))) {

            this.ngControl.control.setErrors({ 'email': true })

        }

        else {

            this.ngControl.control.setErrors(null);

        }

    }

    @HostListener('keyup', ['$event']) checkLang(event: KeyboardEvent) {

 

        if (this.elementRef.nativeElement.value.indexOf("xn--") != -1) {

            var len = this.elementRef.nativeElement.value.length;

            this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.replace(this.elementRef.nativeElement.value.substring(this.elementRef.nativeElement.value.indexOf("x"), len),String.fromCharCode(event.keyCode).toLowerCase());

        }

        else

        {

            this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.replace(/['/א-פצ-ש]/, String.fromCharCode(event.keyCode).toLowerCase());

            this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.replace(/[ת]/, ',');

            this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.replace(/[ץ]/, '.');

        }

           

        this.onkeyup(this.elementRef.nativeElement.value);

    }

 

    validateEmail(email) {

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);

    }

 

}
