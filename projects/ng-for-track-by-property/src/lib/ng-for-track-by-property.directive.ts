import { NgForOf } from '@angular/common';
import { Directive, Host, Input, NgIterable, TrackByFunction } from '@angular/core';

@Directive()
export class NgForTrackByPropertyBaseDirective<T> {

    @Input() ngForOf!: NgIterable<T>;

    constructor(ngForOfDir: NgForOf<T>, fn: TrackByFunction<T>) {
        ngForOfDir.ngForTrackBy = fn;
    }
}

/**
 * @ngModule NgForTrackByPropertyModule
 *
 * @description
 *
 * The `[ngForTrackByProperty]` directive provide an Angular trackBy.
 *
 * @usageNotes
 *
 * ### Usage
 *
 * ```html
 * <ul>
 *   <li *ngFor="let item of list; trackByProperty: 'id'">
 *     id: {{ item.id }}; name: {{ item.name }}
 *   </li>
 * </ul>
 * ```
 */
@Directive({
    selector: '[ngForTrackByProperty]',
    standalone: true
})
export class NgForTrackByPropertyDirective<T> extends NgForTrackByPropertyBaseDirective<T> {

    /**
     * @ngModule NgForTrackByPropertyModule
     *
     * @description
     *
     * The `[ngForTrackByProperty]` directive provide an Angular trackBy.
     *
     * @usageNotes
     *
     * ### Usage
     *
     * ```html
     * <ul>
     *   <li *ngFor="let item of list; trackByProperty: 'id'">
     *     id: {{ item.id }}; name: {{ item.name }}
     *   </li>
     * </ul>
     * ```
     */
    @Input() ngForTrackByProperty!: keyof T;

    constructor(@Host() ngForOfDir: NgForOf<T>) {
        super(ngForOfDir, (_, item: T): T[keyof T] => item[this.ngForTrackByProperty])
    }
}

/**
 * @ngModule NgForTrackByPropertyModule
 *
 * @description
 *
 * The `[ngForTrackByIndex]` directive provide an Angular trackBy.
 *
 * @usageNotes
 *
 * ### Usage
 *
 * ```html
 * <ul>
 *   <li *ngFor="let item of list; ngForTrackByIndex">
 *     id: {{ item.id }}; name: {{ item.name }}
 *   </li>
 * </ul>
 * ```
 */
@Directive({
    selector: '[ngForTrackByIndex]',
    standalone: true
})
export class NgForTrackByIndexDirective<T> extends NgForTrackByPropertyBaseDirective<T> {
    constructor(@Host() ngForOfDir: NgForOf<T>) {
        super(ngForOfDir, (index: number): number => index)
    }
}

/**
 * @ngModule NgForTrackByPropertyModule
 *
 * @description
 *
 * The `[ngForTrackById]` directive provide an Angular trackBy.
 *
 * @usageNotes
 *
 * ### Usage
 *
 * ```html
 * <ul>
 *   <li *ngFor="let item of list; ngForTrackById">
 *     id: {{ item.id }}; name: {{ item.name }}
 *   </li>
 * </ul>
 * ```
 */
@Directive({
    selector: '[ngForTrackById]',
    standalone: true
})
export class NgForTrackByIdDirective<T extends { id: number | string }> extends NgForTrackByPropertyBaseDirective<T> {
    constructor(@Host() ngForOfDir: NgForOf<T>) {
        super(ngForOfDir, (_, item: T) => item.id)
    }
}