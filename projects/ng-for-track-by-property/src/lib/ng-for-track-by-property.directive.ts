import { NgForOf } from '@angular/common';
import { Directive, Host, Input, NgIterable } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[ngForTrackByProperty]'
})
export class NgForTrackByPropertyDirective<T> {

    private propertyName!: keyof T;

    @Input() ngForOf!: NgIterable<T>;

    constructor(@Host() ngForOfDir: NgForOf<T>) {
        ngForOfDir.ngForTrackBy = (index: number, item: T): T[keyof T] => item[this.propertyName];
    }

    @Input()
    set ngForTrackByProperty(value: keyof T) {
        this.propertyName = value;
    }
}
