import { CommonModule, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgForTrackByIdDirective } from './ng-for-track-by-id.directive';

interface Item {
  id: number;
  name: string;
}

@Component({
  imports: [ CommonModule, NgForTrackByIdDirective ],
  standalone: true,
  template: `<span *ngFor="let item of items; trackById">{{ item.name }}</span>`,
})
class TestComponent {
  public readonly items: Item[] = [
    { id: 0, name: 'Alice' },
    { id: 1, name: 'Bob' },
    { id: 2, name: 'Carol' },
  ];

  public readonly property: string = 'id';
}

describe('NgForTrackByIdDirective', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({ imports: [ TestComponent ] });
  });

  it('should track by object id', (): void => {
    const fixture = TestBed.createComponent(TestComponent);
    const testComponent = fixture.componentInstance;
    const mockNgForOf = {} as NgForOf<Item>;
    const directive = new NgForTrackByIdDirective<Item>(mockNgForOf);

    expect(directive).toBeTruthy();
    expect(mockNgForOf.ngForTrackBy).toBeDefined();

    for (const item of testComponent.items) {
      const ret = mockNgForOf.ngForTrackBy(999, item) as number;
      expect(ret).toBe(item.id);
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
