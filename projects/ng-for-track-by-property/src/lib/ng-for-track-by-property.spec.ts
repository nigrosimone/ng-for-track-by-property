import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForTrackByPropertyModule } from './ng-for-track-by-property.module';

@Component({ template: `<ul><li *ngFor="let item of list; trackByProperty: 'id'">{{ item.name }}</li></ul>` })
class TestPropertyComponent {
    list = [
        { id: 0, name: 'foo' },
        { id: 1, name: 'bar' },
        { id: 2, name: 'baz' },
    ];
}
describe('NgForTrackByProperty: trackByProperty', () => {

    let fixture: ComponentFixture<TestPropertyComponent>;
    let debugElement: DebugElement;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestPropertyComponent],
            imports: [NgForTrackByPropertyModule]
        });
        fixture = TestBed.createComponent(TestPropertyComponent);
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

@Component({ template: `<ul><li *ngFor="let item of list; trackByIndex">{{ item.name }}</li></ul>` })
class TestIndexComponent {
    list = [
        { id: 0, name: 'foo' },
        { id: 1, name: 'bar' },
        { id: 2, name: 'baz' },
    ];
}
describe('NgForTrackByProperty: trackByIndex', () => {

    let fixture: ComponentFixture<TestIndexComponent>;
    let debugElement: DebugElement;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestIndexComponent],
            imports: [NgForTrackByPropertyModule]
        });
        fixture = TestBed.createComponent(TestIndexComponent);
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



@Component({ template: `<ul><li *ngFor="let item of list; trackById">{{ item.name }}</li></ul>` })
class TestIdComponent {
    list = [
        { id: 0, name: 'foo' },
        { id: 1, name: 'bar' },
        { id: 2, name: 'baz' },
    ];
}
describe('NgForTrackByProperty: trackById', () => {

    let fixture: ComponentFixture<TestIdComponent>;
    let debugElement: DebugElement;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestIdComponent],
            imports: [NgForTrackByPropertyModule]
        });
        fixture = TestBed.createComponent(TestIdComponent);
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