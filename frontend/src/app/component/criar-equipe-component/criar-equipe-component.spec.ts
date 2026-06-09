import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarEquipeComponent } from './criar-equipe-component';

describe('CriarEquipeComponent', () => {
  let component: CriarEquipeComponent;
  let fixture: ComponentFixture<CriarEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarEquipeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CriarEquipeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
