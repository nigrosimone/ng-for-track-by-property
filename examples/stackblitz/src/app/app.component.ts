import { NgForOf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NgForTrackByPropertyModule } from 'ng-for-track-by-property';

interface Item {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  imports: [NgForOf, NgForTrackByPropertyModule],
  template: `
    <button (click)="rename()">Rename one row</button>

    <!-- keyed by id: renaming a row rebuilds nothing, the existing <li> is reused.
         drop the trackByProperty below and every row is torn down and rebuilt,
         because a new object identity is a new row as far as *ngFor is concerned -->
    <ul>
      <li *ngFor="let item of list(); trackByProperty: 'id'">{{ item.id }} — {{ item.name }}</li>
    </ul>
  `,
})
export class AppComponent {
  list = signal<Item[]>([
    { id: 1, name: 'one' },
    { id: 2, name: 'two' },
    { id: 3, name: 'three' },
  ]);

  rename() {
    // a whole new array of whole new objects, with the same ids
    this.list.update((list) =>
      list.map((item) => (item.id === 2 ? { ...item, name: Date.now().toString() } : { ...item })),
    );
  }
}
