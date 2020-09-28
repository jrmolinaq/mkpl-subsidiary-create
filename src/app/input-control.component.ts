import { Component, Input, Optional, Self, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { Errors } from './constants/validation-errors';

declare const Liferay: any;

@Component({
  selector: 'app-input-control',
  templateUrl: 
    Liferay.ThemeDisplay.getPathContext() + 
    '/o/mkpl-subsidiary-create/app/input-control.component.html'
})
export class InputControlComponent implements OnInit {
  @Input() classContainer: string;
  @Input() label: string;
  @Input() id: string;
  @Input() placeholder = '';
  @Input() disabled = false;
  control: NgControl;
  @Input() value: string;
  @Output() item: EventEmitter<string> = new EventEmitter();
  errorMessages = Errors;

  constructor(@Self() @Optional() control: NgControl) {
    if (control) {
      control.valueAccessor = this;
      this.control = control;
    }
  }

  ngOnInit() {
    if (this.value) {
      this.onChange();
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }

  markAsTouched() {
    if (this.control) {
      this.control.control.markAsTouched();
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.markAsTouched = fn;
  }

  onChange() {
    this.propagateChange(this.value);
  }

  propagateChange = (_: any) => {};

  inputItem(item: string) {
    this.item.emit(item);
  }
}