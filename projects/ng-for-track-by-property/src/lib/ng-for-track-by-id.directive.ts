import { NgForOf } from '@angular/common'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Directive, Host } from '@angular/core';

@Directive({
  // This selector must start with `ngFor` because it is used in a *ngFor structural directive
  // binding. Somehow, for some reason, Angular prefixes the selector with `ngFor`, but on use it is
  // `trackById:`
  selector: '[ngForTrackById]',
  standalone: true,
})
export class NgForTrackByIdDirective<T extends { id: number | string }> {
  constructor(@Host() private readonly ngForOfDir: NgForOf<T>) {
    this.ngForOfDir.ngForTrackBy = (_: number, item: T): T['id'] => item.id;
  }
}
