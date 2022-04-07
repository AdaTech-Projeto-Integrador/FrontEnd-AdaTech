import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEditComponent } from './usuario-edit.component';

describe('UsuarioEditComponent', () => {
  let component: UsuarioEditComponent;
  let fixture: ComponentFixture<UsuarioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
