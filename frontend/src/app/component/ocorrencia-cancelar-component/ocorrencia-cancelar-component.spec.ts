import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciaCancelarComponent } from './ocorrencia-cancelar-component';

describe('OcorrenciaCancelarComponent', () => {
  let component: OcorrenciaCancelarComponent;
  let fixture: ComponentFixture<OcorrenciaCancelarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcorrenciaCancelarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OcorrenciaCancelarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
