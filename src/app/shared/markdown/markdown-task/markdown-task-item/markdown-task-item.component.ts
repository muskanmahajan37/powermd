import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MarkdownListModel } from '../../model/markdown.model';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'component-markdown-task-item',
  templateUrl: './markdown-task-item.component.html',
  styleUrls: ['./markdown-task-item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownTaskItemComponent),
      multi: true
    }
  ]
})
export class MarkdownTaskItemComponent implements OnInit, ControlValueAccessor {
  @Input() item: MarkdownListModel;
  @Output() itemChange = new EventEmitter();

  private disabled = false;

  onChange(param1) {
  }

  onTouched(param1) {
  }

  constructor() {
  }

  ngOnInit() {
  }


  registerOnChange(fn: any): void {
    this.itemChange.emit = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    if (obj !== null && obj !== undefined) {
      this.item = obj;
      if (this.item && !this.item.completed) {
        this.item.completed = false;
      }
    }
  }

  updateText($event: any) {
    this.item.editable = false;
    this.itemChange.emit(this.item);
  }

  changeStartDateInput($event: any) {
    this.item.startDate = $event;
    this.itemChange.emit(this.item);
  }

  changeEndDateInput($event: any) {
    this.item.endDate = $event;
    this.itemChange.emit(this.item);
  }

  enableEdit(event) {
    this.item.editable = true;
  }

  checkValue($event: MatCheckboxChange) {
    this.item.completed = $event.checked;
    this.itemChange.emit(this.item);
  }
}
