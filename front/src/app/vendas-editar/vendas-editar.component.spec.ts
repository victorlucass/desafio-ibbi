import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasEditarComponent } from './vendas-editar.component';

describe('VendasEditarComponent', () => {
  let component: VendasEditarComponent;
  let fixture: ComponentFixture<VendasEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendasEditarComponent]
    });
    fixture = TestBed.createComponent(VendasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
