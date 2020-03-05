import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MarkdownListModel } from '../../model/markdown.model';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'markdown-rating-item',
  templateUrl: './markdown-rating-item.component.html',
  styleUrls: ['./markdown-rating-item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownRatingItemComponent),
      multi: true
    }
  ]
})
export class MarkdownRatingItemComponent implements OnInit {
  @Input() item: MarkdownListModel;
  @Input() isParent: boolean;
  @Output() itemChange = new EventEmitter();

  private disabled = false;

  onChange(param1) {
  }

  onTouched(param1) {
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

  updateValue($event: MatSliderChange) {
    this.item.value = $event.value;
    const execArray = /(.*)\:\s*(\d)/.exec(this.item.text);
    if (execArray && execArray.length >= 3) {
      const text = execArray[1];
      this.item.text = text + ':' + this.item.value;
    } else {
       this.item.text = this.item.text + ':' + this.item.value;
    }

    this.itemChange.emit(this.item);
  }
}
