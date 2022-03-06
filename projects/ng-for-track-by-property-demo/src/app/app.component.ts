import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
}
