import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MarkdownTaskItemComponent } from './markdown-task-item.component';
import { SharedModule } from '../../../shared.module';
import { FeaturesModule } from '../../../../features/features.module';

describe('MarkdownTaskItemFormComponent', () => {
  let component: MarkdownTaskItemComponent;
  let fixture: ComponentFixture<MarkdownTaskItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule,
        FeaturesModule
      ],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownTaskItemComponent);
    component = fixture.componentInstance;
    component.item = {
      id: '',
      completed: false,
      text: '23442'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
