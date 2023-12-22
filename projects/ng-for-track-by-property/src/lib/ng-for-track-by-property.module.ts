import { NgModule } from '@angular/core';

import { NgForTrackByIdDirective } from './ng-for-track-by-id.directive';
import { NgForTrackByIdentityDirective } from './ng-for-track-by-identity.directive';
import { NgForTrackByIndexDirective } from './ng-for-track-by-index.directive';
import { NgForTrackByPropertyDirective } from './ng-for-track-by-property.directive';

@NgModule({
  imports: [
    NgForTrackByIdDirective,
    NgForTrackByIdentityDirective,
    NgForTrackByIndexDirective,
    NgForTrackByPropertyDirective,
  ],
  exports: [
    NgForTrackByIdDirective,
    NgForTrackByIdentityDirective,
    NgForTrackByIndexDirective,
    NgForTrackByPropertyDirective,
  ],
})
export class NgForTrackByPropertyModule { }
