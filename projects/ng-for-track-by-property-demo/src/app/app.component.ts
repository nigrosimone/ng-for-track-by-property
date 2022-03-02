import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  list = Array(3).fill(undefined).map((_, i) => ({id: i, count: 0}));

  randomChange() {
    this.list[Math.floor(Math.random() * this.list.length)].count++;
  }
}
