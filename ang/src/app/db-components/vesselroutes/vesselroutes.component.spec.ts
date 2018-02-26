import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselRoutesComponent } from './vesselroutes.component';

describe('VesselRoutesComponent', () => {
  let component: VesselRoutesComponent;
  let fixture: ComponentFixture<VesselRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VesselRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VesselRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
