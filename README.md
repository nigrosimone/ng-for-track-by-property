# NgForTrackByProperty [![Build Status](https://app.travis-ci.com/nigrosimone/ng-for-track-by-property.svg?branch=main)](https://app.travis-ci.com/nigrosimone/ng-for-track-by-property) [![Coverage Status](https://coveralls.io/repos/github/nigrosimone/ng-for-track-by-property/badge.svg?branch=main)](https://coveralls.io/github/nigrosimone/ng-for-track-by-property?branch=main) [![NPM version](https://img.shields.io/npm/v/ng-for-track-by-property.svg)](https://www.npmjs.com/package/ng-for-track-by-property)

Angular global trackBy property directive with strict type checking.

## Description

When displaying a list of data (at least somewhat large lists) you should be using Angular's `trackBy` feature which looks something like:

```ts
import { Component } from '@angular/core';

interface Item { 
  id: number; 
  name: string;
}

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let item of list; trackBy: trackById">
        {{ item.id }} {{ item.name }}
      </li>
    </ul>
  `,
})
export class AppListComponent {
  public list: Array<Item> = [
    { id: 0, name: 'foo' },
    { id: 1, name: 'bar' },
    { id: 2, name: 'baz' },
  ];

  public trackById(index: number, item: Item) {
    return item.id;
  }
}
```

Unfortunately, Angular forces us to write a tracking function in each component in which we want to make use of `trackBy`.
With `ng-for-track-by-property` you could just handle this entirely in the template by passing a property like this:

```ts
import { Component } from '@angular/core';

interface Item { 
  id: number; 
  name: string;
}

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let item of list; trackByProperty: 'id'">
        {{ item.id }} {{ item.name }}
      </li>
    </ul>
  `,
})
export class AppListComponent {
  public list: Array<Item> = [
    { id: 0, name: 'foo' },
    { id: 1, name: 'bar' },
    { id: 2, name: 'baz' },
  ];
}
```

 `ng-for-track-by-property` has strict type checking and only available property are allowed

![alt text](https://github.com/nigrosimone/ng-for-track-by-property/blob/main/help.gif?raw=true)

See the [stackblitz demo](https://stackblitz.com/edit/demo-ng-for-track-by-property?file=src%2Fapp%2Fapp.component.ts).

## Features

✅ trackBy property name<br>
✅ Type casting<br>
✅ trackBy index<br>

## Get Started

*Step 1*: install `ng-for-track-by-property`

```bash
npm i ng-for-track-by-property
```

*Step 2*: Import `NgForTrackByPropertyModule` into your app module, eg.:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NgForTrackByPropertyModule } from 'ng-for-track-by-property';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    NgForTrackByPropertyModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  ],
})
export class AppModule { }
```

*Step 3*: add `trackByProperty` to your `ngFor`, eg.:

```ts
import { Component } from '@angular/core';

interface Item { 
  id: number; 
  name: string;
}

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let item of list; trackByProperty: 'id'">
        {{ item.id }} {{ item.name }}
      </li>
    </ul>
  `,
})
export class AppComponent {
  public list: Array<Item> = [
    { id: 0, name: 'foo' },
    { id: 1, name: 'bar' },
    { id: 2, name: 'baz' },
  ];
}
```

you can also track by index with `trackByIndex`, eg.:

```ts
import { Component } from '@angular/core';

interface Item { 
  id: number; 
  name: string;
}

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let item of list; trackByIndex">
        {{ item.id }} {{ item.name }}
      </li>
    </ul>
  `,
})
export class AppComponent {
  public list: Array<Item> = [
    { id: 0, name: 'foo' },
    { id: 1, name: 'bar' },
    { id: 2, name: 'baz' },
  ];
}
```

## Support

This is an open-source project. Star this [repository](https://github.com/nigrosimone/ng-for-track-by-property), if you like it, or even [donate](https://www.paypal.com/paypalme/snwp). Thank you so much! 

## My other libraries

I have published some other Angular libraries, take a look:

 - [NgSimpleState: Simple state management in Angular with only Services and RxJS](https://www.npmjs.com/package/ng-simple-state)
 - [NgPortal: Component property connection in Angular application](https://www.npmjs.com/package/ng-portal)
 - [NgHttpCaching: Cache for HTTP requests in Angular application](https://www.npmjs.com/package/ng-http-caching)
 - [NgGenericPipe: Generic pipe for Angular application](https://www.npmjs.com/package/ng-generic-pipe)
 - [NgForTrackByProperty: Structural directive for sharing data as local variable into html component template](https://www.npmjs.com/package/ng-for-track-by-property)
 - [NgLock: Angular decorator for lock a function and user interface while a task running](https://www.npmjs.com/package/ng-lock)
 - [NgCondition: An alternative to `*ngIf; else` directive for simplify conditions into HTML template for Angular application](https://www.npmjs.com/package/ng-condition)
