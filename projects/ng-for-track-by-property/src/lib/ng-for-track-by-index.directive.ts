/**
 * Sets the NgForOf#ngForTrackBy TrackByFunction to return the same item it recieves. This is only
 * to be used for primative types like numbers and strings.
 * Example use:
 *   `*ngFor="let title of books; let i = index; trackByIdentity"`
 * Note that `trackByIdentity` must be last.
 */
import { NgForOf } from '@angular/common'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Directive, Host } from '@angular/core';

@Directive({
  // This selector must start with `ngFor` because it is used in a *ngFor structural directive
  // binding. Somehow, for some reason, Angular prefixes the selector with `ngFor`, but on use it is
  // `trackByIndex`
  selector: '[ngForTrackByIndex]',
  standalone: true,
})
export class NgForTrackByIndexDirective<T> {
  constructor(@Host() private readonly ngForOfDir: NgForOf<T>) {
    this.ngForOfDir.ngForTrackBy = (index: number): number => index;
  }
}
