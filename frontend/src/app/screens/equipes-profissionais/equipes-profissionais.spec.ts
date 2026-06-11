import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipesProfissionais } from './equipes-profissionais';

describe('EquipesProfissionais', () => {
  let component: EquipesProfissionais;
  let fixture: ComponentFixture<EquipesProfissionais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipesProfissionais],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipesProfissionais);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
