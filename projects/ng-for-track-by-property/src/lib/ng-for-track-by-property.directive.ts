/**
 * Sets the NgForOf#ngForTrackBy TrackByFunction to return a property of item. This is only to be
 * used on object types.
 * Example use:
 *   `*ngFor="let category of item.detailedCategories; trackByProperty:'plaidCategory'"`
 * Note that `trackByProperty` must be last thing in the `*ngFor`.
 */
import { NgForOf } from '@angular/common'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Directive, Host, Input } from '@angular/core';

@Directive({
  // This selector must start with `ngFor` because it is used in a *ngFor structural directive
  // binding. Somehow, for some reason, Angular prefixes the selector with `ngFor`, but on use it is
  // `trackByProperty:'thePropertyName'`
  selector: '[ngForTrackByProperty]',
  standalone: true,
})
export class NgForTrackByPropertyDirective<T extends object> {
  @Input({ required: true }) public ngForTrackByProperty!: keyof T;

  constructor(@Host() private readonly ngForOfDir: NgForOf<T>) {
    this.ngForOfDir.ngForTrackBy = (_: number, item: T): T[keyof T] => item[this.ngForTrackByProperty];
  }
}
