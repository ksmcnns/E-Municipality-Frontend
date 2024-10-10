import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalityRegisterComponent } from './municipality-register.component';

describe('MunicipalityRegisterComponent', () => {
  let component: MunicipalityRegisterComponent;
  let fixture: ComponentFixture<MunicipalityRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MunicipalityRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MunicipalityRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
