import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningDialogComponent } from './opening-dialog.component';

describe('OpeningDialogComponent', () => {
  let component: OpeningDialogComponent;
  let fixture: ComponentFixture<OpeningDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
