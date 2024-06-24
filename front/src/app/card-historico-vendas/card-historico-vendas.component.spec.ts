import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHistoricoVendasComponent } from './card-historico-vendas.component';

describe('CardHistoricoVendasComponent', () => {
  let component: CardHistoricoVendasComponent;
  let fixture: ComponentFixture<CardHistoricoVendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardHistoricoVendasComponent]
    });
    fixture = TestBed.createComponent(CardHistoricoVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
