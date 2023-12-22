import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgForTrackByPropertyModule } from '../../../ng-for-track-by-property/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, NgForTrackByPropertyModule ],
  template: `
<button (click)="addElement()">Add element</button>
<button (click)="removeElement()">Remove element</button>
<button (click)="randomChange()">Random change</button>
<br>

<h3>trackByProperty</h3>
<ul>
  <li *ngFor="let item of list; trackByProperty: 'id'">
    id: {{ item.id }}; name: {{ item.name }}
  </li>
</ul>
<h3>trackByIndex</h3>
<ul>
  <li *ngFor="let item of list; trackByIndex">
    id: {{ item.id }}; name: {{ item.name }}
  </li>
</ul>
<h3>trackById</h3>
<ul>
  <li *ngFor="let item of list; trackById">
    id: {{ item.id }}; name: {{ item.name }}
  </li>
</ul>
<h3>No trackBy</h3>
<ul>
  <li *ngFor="let item of list">
    id: {{ item.id }}; name: {{ item.name }}
  </li>
</ul>
`,
  styles: [ 'ul { max-height: 100px; overflow: auto; }' ],
})
export class AppComponent {
  list = Array(3).fill(undefined).map((_, i) => ({id: i, name: `foo_${i}`}));

  addElement() {
    this.list.push({id: this.list.length, name: `foo_${this.list.length}`});
  }

  removeElement(){
    if(this.list.length > 0){
      const random = Math.floor(Math.random() * this.list.length);
      this.list.splice(random, 1);
   }
  }

  randomChange() {
    const random = Math.floor(Math.random() * this.list.length);
    this.list[random].name = new Date().getTime().toString();
  }
}
