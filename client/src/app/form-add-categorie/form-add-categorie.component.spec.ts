import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddCategorieComponent } from './form-add-categorie.component';

describe('FormAddCategorieComponent', () => {
  let component: FormAddCategorieComponent;
  let fixture: ComponentFixture<FormAddCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddCategorieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAddCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
