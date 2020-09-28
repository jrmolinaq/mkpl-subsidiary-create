import { Component, Input, Optional, Self, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { Errors } from './constants/validation-errors';

declare const Liferay: any;

@Component({
  selector: 'app-select-control',
  templateUrl: 
    Liferay.ThemeDisplay.getPathContext() + 
    '/o/mkpl-subsidiary-create/app/select-control.component.html'
})
export class SelectControlComponent implements ControlValueAccessor {
  @Input() classContainer: string;
  @Input() label: string;
  @Input() id: string;
  @Input() placeholder = '';
  @Input() data: any = [];
  @Output() valueChange = new EventEmitter();
  control: NgControl;
  disabled: boolean;
  value: string;
  errorMessages = Errors;

  constructor(@Self() @Optional() control: NgControl) {
    if (control) {
      control.valueAccessor = this;
      this.control = control;
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

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange() {
    this.propagateChange(this.value);
    this.valueChange.emit(this.value);
  }

  propagateChange = (_: any) => { };
}