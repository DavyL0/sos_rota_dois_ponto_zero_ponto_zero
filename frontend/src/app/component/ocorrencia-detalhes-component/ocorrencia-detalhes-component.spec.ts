import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciaDetalhesComponent } from './ocorrencia-detalhes-component';

describe('OcorrenciaDetalhesComponent', () => {
  let component: OcorrenciaDetalhesComponent;
  let fixture: ComponentFixture<OcorrenciaDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcorrenciaDetalhesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OcorrenciaDetalhesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
