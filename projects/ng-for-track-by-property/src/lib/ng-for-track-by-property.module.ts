import { NgModule } from '@angular/core';
import { NgForTrackByIndexDirective, NgForTrackByPropertyDirective } from './ng-for-track-by-property.directive';

@NgModule({
  declarations: [NgForTrackByPropertyDirective, NgForTrackByIndexDirective],
  imports: [],
  exports: [NgForTrackByPropertyDirective, NgForTrackByIndexDirective],
  providers: []
})
export class NgForTrackByPropertyModule { }
