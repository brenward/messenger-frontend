import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chatcomponent } from './chatcomponent';

describe('Chatcomponent', () => {
  let component: Chatcomponent;
  let fixture: ComponentFixture<Chatcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chatcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Chatcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
