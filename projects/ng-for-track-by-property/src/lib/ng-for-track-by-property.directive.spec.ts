import { CommonModule, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgForTrackByPropertyDirective } from './ng-for-track-by-property.directive';

interface Item {
  id: string;
  name: string;
}

@Component({
  imports: [ CommonModule, NgForTrackByPropertyDirective ],
  standalone: true,
  template: `<span *ngFor="let item of items; trackByProperty:property">{{ item.name }}</span>`,
})
class TestComponent {
  public readonly items: Item[] = [
    { id: 'foo', name: 'Alice' },
    { id: 'bar', name: 'Bob' },
    { id: 'baz', name: 'Carol' },
  ];

  public readonly property: string = 'id';
}

describe('NgForTrackByPropertyDirective', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({ imports: [ TestComponent ] });
  });

  it('should input property key', (): void => {
    const fixture = TestBed.createComponent(TestComponent);
    const [ node ] = fixture.debugElement.queryAllNodes(By.directive(NgForTrackByPropertyDirective));
    if (node) {
      const { injector } = node;
      const directive = injector.get(NgForTrackByPropertyDirective) as NgForTrackByPropertyDirective<Item>;
      fixture.detectChanges();
      expect(directive.ngForTrackByProperty).toBe('id');
    } else {
      fail('could not find DebugNode for NgForTrackByPropertyDirective');
    }
  });

  it('should track by object property', (): void => {
    const fixture = TestBed.createComponent(TestComponent);
    const testComponent = fixture.componentInstance;
    const mockNgForOf = {} as NgForOf<Item>;
    const directive = new NgForTrackByPropertyDirective<Item>(mockNgForOf);

    directive.ngForTrackByProperty = 'name';
    expect(mockNgForOf.ngForTrackBy).toBeDefined();

    for (const item of testComponent.items) {
      const ret = mockNgForOf.ngForTrackBy(999, item) as string;
      expect(ret).toBe(item.name);
    }
  });

  it('should apply trackBy function', (): void => {
    const fixture = TestBed.createComponent(TestComponent);
    const testComponent = fixture.componentInstance;
    const [ node ] = fixture.debugElement.queryAllNodes(By.directive(NgForOf));
    if (node) {
      const { injector } = node;
      const ngForOfDir = injector.get(NgForOf);
      // @ts-expect-error Spy on private property for testing
      const trackBySpy = spyOn(ngForOfDir, '_trackByFn').and.callThrough();

      fixture.detectChanges();
      expect(trackBySpy).toHaveBeenCalledTimes(3);
      expect(trackBySpy).toHaveBeenCalledWith(0, testComponent.items[0]);
      expect(trackBySpy).toHaveBeenCalledWith(1, testComponent.items[1]);
      expect(trackBySpy).toHaveBeenCalledWith(2, testComponent.items[2]);
    } else {
      fail('could not find DebugNode for NgForOf');
    }
  });
});
