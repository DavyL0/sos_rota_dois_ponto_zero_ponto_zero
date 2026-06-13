import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespacharOcorrenciaComponent } from './despachar-ocorrencia-component';

describe('DespacharOcorrenciaComponent', () => {
  let component: DespacharOcorrenciaComponent;
  let fixture: ComponentFixture<DespacharOcorrenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DespacharOcorrenciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DespacharOcorrenciaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
