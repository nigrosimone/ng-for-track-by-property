import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgForTrackByPropertyModule } from './ng-for-track-by-property.module';
import { CommonModule } from '@angular/common';
import { NgForTrackByIdDirective, NgForTrackByIndexDirective, NgForTrackByPropertyDirective } from './ng-for-track-by-property.directive';

describe('NgForTrackByProperty', () => {

    it('ngModule trackByProperty', () => {
        @Component({ template: `<ul><li *ngFor="let item of list; trackByProperty: 'id'">{{ item.name }}</li></ul>`, standalone: true, imports: [CommonModule, NgForTrackByPropertyModule] })
        class TestComponent {
            list = [
                { id: 0, name: 'foo' },
                { id: 1, name: 'bar' },
                { id: 2, name: 'baz' },
            ];
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('foobarbaz');
    });

    it('ngModule trackByIndex', () => {
        @Component({ template: `<ul><li *ngFor="let item of list; trackByIndex">{{ item.name }}</li></ul>`, standalone: true, imports: [CommonModule, NgForTrackByPropertyModule] })
        class TestComponent {
            list = [
                { id: 0, name: 'foo' },
                { id: 1, name: 'bar' },
                { id: 2, name: 'baz' },
            ];
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('foobarbaz');
    });

    it('ngModule trackById', () => {
        @Component({ template: `<ul><li *ngFor="let item of list; trackById">{{ item.name }}</li></ul>`, standalone: true, imports: [CommonModule, NgForTrackByPropertyModule] })
        class TestComponent {
            list = [
                { id: 0, name: 'foo' },
                { id: 1, name: 'bar' },
                { id: 2, name: 'baz' },
            ];
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('foobarbaz');
    });

    it('standalone trackByProperty', () => {
        @Component({ template: `<ul><li *ngFor="let item of list; trackByProperty: 'id'">{{ item.name }}</li></ul>`, standalone: true, imports: [CommonModule, NgForTrackByPropertyDirective] })
        class TestComponent {
            list = [
                { id: 0, name: 'foo' },
                { id: 1, name: 'bar' },
                { id: 2, name: 'baz' },
            ];
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('foobarbaz');
    });

    it('standalone trackByIndex', () => {
        @Component({ template: `<ul><li *ngFor="let item of list; trackByIndex">{{ item.name }}</li></ul>`, standalone: true, imports: [CommonModule, NgForTrackByIndexDirective] })
        class TestComponent {
            list = [
                { id: 0, name: 'foo' },
                { id: 1, name: 'bar' },
                { id: 2, name: 'baz' },
            ];
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('foobarbaz');
    });

    it('standalone trackById', () => {
        @Component({ template: `<ul><li *ngFor="let item of list; trackById">{{ item.name }}</li></ul>`, standalone: true, imports: [CommonModule, NgForTrackByIdDirective] })
        class TestComponent {
            list = [
                { id: 0, name: 'foo' },
                { id: 1, name: 'bar' },
                { id: 2, name: 'baz' },
            ];
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('foobarbaz');
    });
});