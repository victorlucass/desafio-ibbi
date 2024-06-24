import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVendasComponent } from './lista-vendas.component';

describe('ListaVendasComponent', () => {
  let component: ListaVendasComponent;
  let fixture: ComponentFixture<ListaVendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaVendasComponent]
    });
    fixture = TestBed.createComponent(ListaVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
