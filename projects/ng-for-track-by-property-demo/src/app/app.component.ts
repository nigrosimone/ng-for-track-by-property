import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgForTrackByPropertyModule } from 'ng-for-track-by-property';

interface Item {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NgForOf, NgForTrackByPropertyModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  list = signal<Item[]>(
    Array(3)
      .fill(undefined)
      .map((_, i) => ({ id: i, name: `foo_${i}` })),
  );

  addElement() {
    this.list.update((list) => [...list, { id: list.length, name: `foo_${list.length}` }]);
  }

  removeElement() {
    this.list.update((list) => {
      if (list.length === 0) {
        return list;
      }
      const random = Math.floor(Math.random() * list.length);
      return list.filter((_, index) => index !== random);
    });
  }

  randomChange() {
    this.list.update((list) => {
      if (list.length === 0) {
        return list;
      }
      const random = Math.floor(Math.random() * list.length);
      // same id, new name: only the trackBy'd rows are reused instead of rebuilt
      return list.map((item, index) =>
        index === random ? { ...item, name: Date.now().toString() } : item,
      );
    });
  }
}
