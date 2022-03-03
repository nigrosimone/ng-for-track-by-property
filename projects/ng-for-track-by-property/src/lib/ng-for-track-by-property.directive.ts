import { NgForOf } from '@angular/common';
import { Directive, Host, Input, NgIterable } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[ngForTrackByProperty]'
})
export class NgForTrackByPropertyDirective<T> {

    @Input() ngForOf!: NgIterable<T>;
    @Input() ngForTrackByProperty!: keyof T;

    constructor(@Host() ngForOfDir: NgForOf<T>) {
        ngForOfDir.ngForTrackBy = (_, item: T): T[keyof T] => item[this.ngForTrackByProperty];
    }
}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[ngForTrackByIndex]'
})
export class NgForTrackByIndexDirective<T> {

    @Input() ngForOf!: NgIterable<T>;

    constructor(@Host() ngForOfDir: NgForOf<T>) {
        ngForOfDir.ngForTrackBy = (index: number): number => index;
    }
}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[ngForTrackById]'
})
export class NgForTrackByIdDirective<T extends {id: number | string}> {

    @Input() ngForOf!: NgIterable<T>;

    constructor(@Host() ngForOfDir: NgForOf<T>) {
        ngForOfDir.ngForTrackBy = (_, item: T) => item.id;
    }
}