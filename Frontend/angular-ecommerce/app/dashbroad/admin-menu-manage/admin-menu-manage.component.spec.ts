import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuManageComponent } from './admin-menu-manage.component';

describe('AdminMenuManageComponent', () => {
  let component: AdminMenuManageComponent;
  let fixture: ComponentFixture<AdminMenuManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMenuManageComponent]
    });
    fixture = TestBed.createComponent(AdminMenuManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
