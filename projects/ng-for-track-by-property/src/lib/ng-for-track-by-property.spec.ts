import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgForTrackByPropertyModule } from './ng-for-track-by-property.module';
import { CommonModule } from '@angular/common';

describe('NgForTrackByProperty', () => {

    it('trackByProperty', () => {
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

    it('trackByIndex', () => {
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

    it('trackById', () => {
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
});