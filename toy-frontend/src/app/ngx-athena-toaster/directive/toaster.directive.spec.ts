import { ToasterDirective } from './toaster.directive';
import { DebugElement, Component, HostListener } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { AthenaToasterComponent } from '../component/athena-toaster/athena-toaster.component';
import { InteranlService } from '../service/interanl.service';
import { AthenaToasterService } from '../service/athena-toaster.service';
import { By } from '@angular/platform-browser';

// Simple test component
@Component({
  template: '<p class="fade-out" appToaster ></p>'
})
class TestComponent {

  constructor() { }
}

describe('ToasterDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, AthenaToasterComponent, ToasterDirective],
      providers: [InteranlService, AthenaToasterService]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('on mouse over, fade-out class removed', () => {
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(By.css('.fade-out'));
    debugElement.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    const el: HTMLElement = debugElement.nativeElement;
    expect(el.className).toBe('');
  });

  it('on mouse over, no fade-out class available ', () => {
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(By.css('.fade-out'));
    debugElement.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    const el: HTMLElement = debugElement.nativeElement;
    expect(el.className).not.toBe('fade-out');
  });

  it('on mouse out, fade-out class added', () => {
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(By.css('.fade-out'));
    debugElement.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    debugElement.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    const el: HTMLElement = debugElement.nativeElement;
    expect(el.className).toBe('fade-out');
  });

  it('on mouse out, element should not have empty class', () => {
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(By.css('.fade-out'));
    debugElement.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    debugElement.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    const el: HTMLElement = debugElement.nativeElement;
    expect(el.className).not.toBe('');
  });

});
