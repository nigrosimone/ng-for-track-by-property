import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the same list four times, once per tracking strategy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelectorAll('li')).toHaveLength(4 * 3);
  });

  it('adds and removes rows', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    component.addElement();
    fixture.detectChanges();
    expect(component.list()).toHaveLength(4);
    expect((fixture.nativeElement as HTMLElement).querySelectorAll('li')).toHaveLength(4 * 4);

    component.removeElement();
    fixture.detectChanges();
    expect(component.list()).toHaveLength(3);
  });

  it('leaves an empty list alone', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.list.set([]);
    fixture.detectChanges();

    fixture.componentInstance.removeElement();
    fixture.componentInstance.randomChange();
    fixture.detectChanges();

    expect(fixture.componentInstance.list()).toHaveLength(0);
  });

  it('renames one row in place, keeping the ids', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const idsBefore = component.list().map((item) => item.id);

    component.randomChange();
    fixture.detectChanges();

    expect(component.list().map((item) => item.id)).toEqual(idsBefore);
    expect(component.list().filter((item) => !item.name.startsWith('foo_'))).toHaveLength(1);
  });
});
