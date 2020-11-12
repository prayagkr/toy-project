import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthenaToasterComponent } from './athena-toaster.component';
import { InteranlService } from '../../service/interanl.service';
import { AthenaToasterService } from '../../service/athena-toaster.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Toaster } from '../../model/toaster.model';

describe('AthenaToasterComponent', () => {
  let component: AthenaToasterComponent;
  let fixture: ComponentFixture<AthenaToasterComponent>;
  let debugElement: DebugElement;
  let el: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthenaToasterComponent ],
      providers: [InteranlService, AthenaToasterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthenaToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create athena toaster component', () => {
    expect(component).toBeTruthy();
  });

  it('getIndexof method should return 0', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    fixture.detectChanges();
    const index: number = component.getIndexof(1, component.toasters);
    expect(index).toBe(0);
  });

  it('getIndexof method should return -1', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    fixture.detectChanges();
    const index: number = component.getIndexof(2, component.toasters);
    expect(index).toBe(-1);
  });

  it('on close(1, 4) with id is envoked, toaster length should be 0', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    fixture.detectChanges();
    component.close(1, 4);
    fixture.detectChanges();
    expect(component.toasters.length).toBe(0);
  });

  it(' on close(1, 4) with id  is envoked, toaster length should be 1', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    component.toasters.push(new Toaster(2, 'error message', 'error header', new Array<boolean>(false, true, false, false)));
    fixture.detectChanges();
    component.close(1, 4);
    fixture.detectChanges();
    expect(component.toasters.length).toBe(1);
  });

  it('on close(3, 4) with id is envoked, toaster length should be 3', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    component.toasters.push(new Toaster(2, 'error message', 'error header', new Array<boolean>(false, true, false, false)));
    component.toasters.push(new Toaster(3, 'warning message', 'warning header', new Array<boolean>(false, false, true, false)));
    component.toasters.push(new Toaster(4, 'info message', 'info header', new Array<boolean>(false, false, false, true)));
    fixture.detectChanges();
    component.close( 3, 4);
    fixture.detectChanges();
    expect(component.toasters.length).toBe(3);
  });

  it('on close(5, 4) with id is envoked, toaster length should be 4', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    component.toasters.push(new Toaster(2, 'error message', 'error header', new Array<boolean>(false, true, false, false)));
    component.toasters.push(new Toaster(3, 'warning message', 'warning header', new Array<boolean>(false, false, true, false)));
    component.toasters.push(new Toaster(4, 'info message', 'info header', new Array<boolean>(false, false, false, true)));
    fixture.detectChanges();
    component.close( 5, 4);
    fixture.detectChanges();
    expect(component.toasters.length).toBe(3);
  });

  it('on close(null, 4) with index is envoked, toaster length should be 1', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    fixture.detectChanges();
    component.close( null, 4);
    fixture.detectChanges();
    expect(component.toasters.length).toBe(1);
  });

  it('on close(null, 1) with index is envoked, toaster length should be 1', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    fixture.detectChanges();
    component.close( null, 1);
    fixture.detectChanges();
    expect(component.toasters.length).toBe(1);
  });

  it('on close(null, 0) with index is envoked, toaster length should be 0', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    fixture.detectChanges();
    component.close( null, 0);
    fixture.detectChanges();
    expect(component.toasters.length).toBe(0);
  });

  it('on close(null, null) with index is envoked, toaster length should be 1', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    fixture.detectChanges();
    component.close( null, null);
    fixture.detectChanges();
    expect(component.toasters.length).toBe(1);
  });

  it('on close(null, 1) with index is envoked, toaster length should be 1', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    component.toasters.push(new Toaster(2, 'error message', 'error header', new Array<boolean>(false, true, false, false)));
    fixture.detectChanges();
    component.close(null, 1);
    fixture.detectChanges();
    expect(component.toasters.length).toBe(1);
  });

  it('on close(null, 3) with index is envoked, toaster length should be 3', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    component.toasters.push(new Toaster(2, 'error message', 'error header', new Array<boolean>(false, true, false, false)));
    component.toasters.push(new Toaster(3, 'warning message', 'warning header', new Array<boolean>(false, false, true, false)));
    component.toasters.push(new Toaster(4, 'info message', 'info header', new Array<boolean>(false, false, false, true)));
    fixture.detectChanges();
    component.close(null, 3);
    fixture.detectChanges();
    expect(component.toasters.length).toBe(3);
  });

  it('on close(null, 4) with index is envoked, toaster length should be 4', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    component.toasters.push(new Toaster(2, 'error message', 'error header', new Array<boolean>(false, true, false, false)));
    component.toasters.push(new Toaster(3, 'warning message', 'warning header', new Array<boolean>(false, false, true, false)));
    component.toasters.push(new Toaster(4, 'info message', 'info header', new Array<boolean>(false, false, false, true)));
    fixture.detectChanges();
    component.close(null, 4);
    fixture.detectChanges();
    expect(component.toasters.length).toBe(4);
  });

  it('on close(null, -1) with index is envoked, toaster length should be 4', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    component.toasters.push(new Toaster(2, 'error message', 'error header', new Array<boolean>(false, true, false, false)));
    component.toasters.push(new Toaster(3, 'warning message', 'warning header', new Array<boolean>(false, false, true, false)));
    component.toasters.push(new Toaster(4, 'info message', 'info header', new Array<boolean>(false, false, false, true)));
    fixture.detectChanges();
    component.close(null, -1);
    fixture.detectChanges();
    expect(component.toasters.length).toBe(4);
  });

  it('should have 1 toaster', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.toast-container'));
    el = debugElement.nativeElement;
    const childrens: HTMLCollection = el.children;
    expect(childrens.length ).toBe(1);
  });

  it('toaster header message should be "success header"', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.toaster__content--header'));
    el = debugElement.nativeElement;
    expect(el.textContent.trim()).toBe('success header');
  });

  it('toaster content message should be "success message"', () => {
    component.toasters.push(new Toaster(1, 'success message', 'success header', new Array<boolean>(true, false, false, false)));
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.toaster__content'));
    el = debugElement.nativeElement;
    expect(el.childNodes[1].textContent.trim()).toBe('success message');
  });


});
