import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElTesoroComponent } from './el-tesoro.component';

describe('ElTesoroComponent', () => {
  let component: ElTesoroComponent;
  let fixture: ComponentFixture<ElTesoroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElTesoroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElTesoroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
