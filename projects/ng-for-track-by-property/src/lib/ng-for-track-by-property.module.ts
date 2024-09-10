import { NgModule } from '@angular/core';
import { NgForTrackByIndexDirective, NgForTrackByPropertyDirective, NgForTrackByIdDirective } from './ng-for-track-by-property.directive';

@NgModule({
  imports: [NgForTrackByPropertyDirective, NgForTrackByIndexDirective, NgForTrackByIdDirective],
  exports: [NgForTrackByPropertyDirective, NgForTrackByIndexDirective, NgForTrackByIdDirective],
})
export class NgForTrackByPropertyModule { }
