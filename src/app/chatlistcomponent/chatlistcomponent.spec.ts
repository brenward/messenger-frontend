import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chatlistcomponent } from './chatlistcomponent';

describe('Chatlistcomponent', () => {
  let component: Chatlistcomponent;
  let fixture: ComponentFixture<Chatlistcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chatlistcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Chatlistcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
