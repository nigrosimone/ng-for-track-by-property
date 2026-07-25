import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  NgForTrackByIdDirective,
  NgForTrackByIndexDirective,
  NgForTrackByPropertyDirective,
} from './ng-for-track-by-property.directive';
import { NgForTrackByPropertyModule } from './ng-for-track-by-property.module';

interface Item {
  id: number;
  name: string;
}

const initial = (): Item[] => [
  { id: 0, name: 'foo' },
  { id: 1, name: 'bar' },
  { id: 2, name: 'baz' },
];

const rows = (fixture: ComponentFixture<unknown>): HTMLLIElement[] =>
  Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('li'));

const text = (fixture: ComponentFixture<unknown>): string =>
  ((fixture.nativeElement as HTMLElement).textContent ?? '').replace(/\s+/g, '');

describe('rendering', () => {
  it('renders the list through trackByProperty, from the module', () => {
    @Component({
      template: `<ul>
        <li *ngFor="let item of list; trackByProperty: 'id'">{{ item.name }}</li>
      </ul>`,
      imports: [NgForOf, NgForTrackByPropertyModule],
    })
    class TestComponent {
      list = initial();
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(text(fixture)).toBe('foobarbaz');
  });

  it('renders the list through trackByIndex, from the module', () => {
    @Component({
      template: `<ul>
        <li *ngFor="let item of list; trackByIndex">{{ item.name }}</li>
      </ul>`,
      imports: [NgForOf, NgForTrackByPropertyModule],
    })
    class TestComponent {
      list = initial();
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(text(fixture)).toBe('foobarbaz');
  });

  it('renders the list through trackById, from the module', () => {
    @Component({
      template: `<ul>
        <li *ngFor="let item of list; trackById">{{ item.name }}</li>
      </ul>`,
      imports: [NgForOf, NgForTrackByPropertyModule],
    })
    class TestComponent {
      list = initial();
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(text(fixture)).toBe('foobarbaz');
  });

  it('renders the same way when the directives are imported one by one', () => {
    @Component({
      template: `<ul>
          <li *ngFor="let item of list; trackByProperty: 'id'">{{ item.name }}</li>
        </ul>
        <ul>
          <li *ngFor="let item of list; trackByIndex">{{ item.name }}</li>
        </ul>
        <ul>
          <li *ngFor="let item of list; trackById">{{ item.name }}</li>
        </ul>`,
      imports: [
        NgForOf,
        NgForTrackByPropertyDirective,
        NgForTrackByIndexDirective,
        NgForTrackByIdDirective,
      ],
    })
    class TestComponent {
      list = initial();
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(text(fixture)).toBe('foobarbazfoobarbazfoobarbaz');
  });

  it('renders an empty list without a row', () => {
    @Component({
      template: `<ul>
        <li *ngFor="let item of list; trackById">{{ item.name }}</li>
      </ul>`,
      imports: [NgForOf, NgForTrackByIdDirective],
    })
    class TestComponent {
      list: Item[] = [];
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(rows(fixture)).toHaveLength(0);
  });
});

/**
 * The point of a trackBy is that a row whose key did not change keeps its DOM node
 * instead of being torn down and rebuilt. Comparing the element instances before and
 * after is the only thing that actually proves it: the rendered text is identical
 * either way.
 */
describe('node reuse', () => {
  @Component({
    template: `<ul id="property">
        <li *ngFor="let item of list(); trackByProperty: 'id'">{{ item.name }}</li>
      </ul>
      <ul id="index">
        <li *ngFor="let item of list(); trackByIndex">{{ item.name }}</li>
      </ul>
      <ul id="id">
        <li *ngFor="let item of list(); trackById">{{ item.name }}</li>
      </ul>
      <ul id="none">
        <li *ngFor="let item of list()">{{ item.name }}</li>
      </ul>`,
    imports: [NgForOf, NgForTrackByPropertyModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class TestComponent {
    list = signal<Item[]>(initial());
  }

  const listRows = (fixture: ComponentFixture<TestComponent>, id: string): HTMLLIElement[] =>
    Array.from((fixture.nativeElement as HTMLElement).querySelectorAll(`ul#${id} li`));

  it('keeps the rows when the list is replaced by equal-keyed objects', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const before = {
      property: listRows(fixture, 'property'),
      index: listRows(fixture, 'index'),
      id: listRows(fixture, 'id'),
      none: listRows(fixture, 'none'),
    };

    // brand new objects, same ids, one renamed
    fixture.componentInstance.list.set([
      { id: 0, name: 'foo' },
      { id: 1, name: 'CHANGED' },
      { id: 2, name: 'baz' },
    ]);
    fixture.detectChanges();

    expect(listRows(fixture, 'property')).toEqual(before.property);
    expect(listRows(fixture, 'index')).toEqual(before.index);
    expect(listRows(fixture, 'id')).toEqual(before.id);
    // the control: with no trackBy, identity is the key, so every row is rebuilt
    expect(listRows(fixture, 'none')).not.toEqual(before.none);

    // reused nodes still show the new value
    expect(listRows(fixture, 'property')[1].textContent).toBe('CHANGED');
  });

  it('moves the existing row when an item changes position', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const before = listRows(fixture, 'property');

    fixture.componentInstance.list.set([
      { id: 2, name: 'baz' },
      { id: 1, name: 'bar' },
      { id: 0, name: 'foo' },
    ]);
    fixture.detectChanges();

    const after = listRows(fixture, 'property');
    // keyed by id: the same three nodes, in reverse
    expect(after).toEqual([before[2], before[1], before[0]]);

    // keyed by position: the nodes stay put and their content is rewritten
    expect(listRows(fixture, 'index').map((row) => row.textContent)).toEqual(['baz', 'bar', 'foo']);
  });

  it('keeps the surviving rows when one is removed', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const before = listRows(fixture, 'id');

    fixture.componentInstance.list.update((list) => list.filter((item) => item.id !== 1));
    fixture.detectChanges();

    expect(listRows(fixture, 'id')).toEqual([before[0], before[2]]);
  });

  it('keeps the existing rows when one is appended', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const before = listRows(fixture, 'property');

    fixture.componentInstance.list.update((list) => [...list, { id: 3, name: 'qux' }]);
    fixture.detectChanges();

    const after = listRows(fixture, 'property');
    expect(after.slice(0, 3)).toEqual(before);
    expect(after).toHaveLength(4);
  });

  it('rebuilds the row when the key itself changes', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const before = listRows(fixture, 'property');

    fixture.componentInstance.list.update((list) =>
      list.map((item) => (item.id === 1 ? { ...item, id: 99 } : item)),
    );
    fixture.detectChanges();

    const after = listRows(fixture, 'property');
    expect(after[0]).toBe(before[0]);
    expect(after[1]).not.toBe(before[1]);
    expect(after[2]).toBe(before[2]);
  });
});

describe('the key each directive tracks by', () => {
  it('trackByProperty follows the property it was given, not the id', () => {
    @Component({
      template: `<ul>
        <li *ngFor="let item of list(); trackByProperty: 'name'">{{ item.id }}</li>
      </ul>`,
      imports: [NgForOf, NgForTrackByPropertyDirective],
      changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
      list = signal<Item[]>(initial());
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const before = rows(fixture);

    // ids all change, names do not: keyed by name, every row survives
    fixture.componentInstance.list.set([
      { id: 10, name: 'foo' },
      { id: 11, name: 'bar' },
      { id: 12, name: 'baz' },
    ]);
    fixture.detectChanges();

    expect(rows(fixture)).toEqual(before);
    expect(text(fixture)).toBe('101112');
  });

  it('trackByIndex keys on the position, so equal-length lists always match', () => {
    @Component({
      template: `<ul>
        <li *ngFor="let item of list(); trackByIndex">{{ item.name }}</li>
      </ul>`,
      imports: [NgForOf, NgForTrackByIndexDirective],
      changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
      list = signal<Item[]>(initial());
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const before = rows(fixture);

    // completely different items, same length: the three nodes are reused as-is
    fixture.componentInstance.list.set([
      { id: 7, name: 'one' },
      { id: 8, name: 'two' },
      { id: 9, name: 'three' },
    ]);
    fixture.detectChanges();

    expect(rows(fixture)).toEqual(before);
    expect(text(fixture)).toBe('onetwothree');
  });

  it('trackById accepts a string id as well as a number', () => {
    @Component({
      template: `<ul>
        <li *ngFor="let item of list(); trackById">{{ item.name }}</li>
      </ul>`,
      imports: [NgForOf, NgForTrackByIdDirective],
      changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
      list = signal<{ id: string; name: string }[]>([
        { id: 'a', name: 'foo' },
        { id: 'b', name: 'bar' },
      ]);
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const before = rows(fixture);

    fixture.componentInstance.list.set([
      { id: 'a', name: 'foo' },
      { id: 'b', name: 'CHANGED' },
    ]);
    fixture.detectChanges();

    expect(rows(fixture)).toEqual(before);
    expect(text(fixture)).toBe('fooCHANGED');
  });
});

describe('edge cases', () => {
  it('renders every row when the key is duplicated', () => {
    @Component({
      template: `<ul>
        <li *ngFor="let item of list(); trackByProperty: 'id'">{{ item.name }}</li>
      </ul>`,
      imports: [NgForOf, NgForTrackByPropertyDirective],
      changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
      list = signal<Item[]>([
        { id: 1, name: 'foo' },
        { id: 1, name: 'bar' },
      ]);
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(rows(fixture)).toHaveLength(2);
    expect(text(fixture)).toBe('foobar');
  });

  it('renders rows whose tracked property is undefined', () => {
    @Component({
      template: `<ul>
        <li *ngFor="let item of list(); trackByProperty: 'id'">{{ item.name }}</li>
      </ul>`,
      imports: [NgForOf, NgForTrackByPropertyDirective],
      changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
      list = signal<{ id?: number; name: string }[]>([
        { name: 'foo' },
        { id: 1, name: 'bar' },
        { name: 'baz' },
      ]);
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(rows(fixture)).toHaveLength(3);
    expect(text(fixture)).toBe('foobarbaz');
  });
});
