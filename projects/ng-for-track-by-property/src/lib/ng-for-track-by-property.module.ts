import { NgModule } from '@angular/core';
import { NgForTrackByIndexDirective, NgForTrackByPropertyDirective, NgForTrackByIdDirective } from './ng-for-track-by-property.directive';

@NgModule({
  declarations: [NgForTrackByPropertyDirective, NgForTrackByIndexDirective, NgForTrackByIdDirective],
  imports: [],
  exports: [NgForTrackByPropertyDirective, NgForTrackByIndexDirective, NgForTrackByIdDirective],
  providers: []
})
export class NgForTrackByPropertyModule { }
