import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForTrackByPropertyModule } from './ng-for-track-by-property.module';

@Component({ template: `<ul *ngFor="let item of list; trackByProperty: 'id'"><li>{{ item.name }}</li></ul>` })
class TestSimpleComponent {
    list = [
        { id: 0, name: 'foo' },
        { id: 1, name: 'bar' },
        { id: 2, name: 'baz' },
    ];
}
describe('NgForTrackByProperty: simple', () => {

    let fixture: ComponentFixture<TestSimpleComponent>;
    let debugElement: DebugElement;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestSimpleComponent],
            imports: [NgForTrackByPropertyModule]
        });
        fixture = TestBed.createComponent(TestSimpleComponent);
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    it('test', () => {
        fixture.detectChanges();
        expect(element.textContent).toBe('foobarbaz');
    });
});
