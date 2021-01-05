import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdatetoolkitComponent } from './updatetoolkit.component';

describe('UpdaterecordComponent', () => {
  let component: UpdatetoolkitComponent;
  let fixture: ComponentFixture<UpdatetoolkitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatetoolkitComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatetoolkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
