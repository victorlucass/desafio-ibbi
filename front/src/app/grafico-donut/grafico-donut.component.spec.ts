import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoDonutComponent } from './grafico-donut.component';

describe('GraficoDonutComponent', () => {
  let component: GraficoDonutComponent;
  let fixture: ComponentFixture<GraficoDonutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoDonutComponent]
    });
    fixture = TestBed.createComponent(GraficoDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
