import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciaCadastrarComponent } from './ocorrencia-cadastrar-component';

describe('OcorrenciaCadastrarComponent', () => {
  let component: OcorrenciaCadastrarComponent;
  let fixture: ComponentFixture<OcorrenciaCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcorrenciaCadastrarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OcorrenciaCadastrarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
