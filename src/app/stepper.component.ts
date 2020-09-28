import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';


declare const Liferay: any;

@Component({
  selector: 'stepper',
  templateUrl: 
    Liferay.ThemeDisplay.getPathContext() + 
    '/o/mkpl-subsidiary-create/app/stepper.component.html'
})

export class StepperComponent implements OnInit, OnChanges {
  @Input() currentStep: number;
  @Input() qtySteps: number;
  @ViewChild('stepperRef', { static: false }) containerRef:any;
  config:any = [];

  ngOnInit() {
    for (let index = 1; index <= this.qtySteps; index++) {
      this.config.push({
        id: `stepper-${index}`,
        class: index === 1 ? 'current' : '',
        value: index
      });
    }
  }

  ngOnChanges(simpleChanges:any) {
    const { currentStep } = simpleChanges;
    if (currentStep.previousValue && currentStep.previousValue !== currentStep.currentValue) {
      if (currentStep.currentValue > this.config.length) {
        for (let index = 1; index <= this.config.length; index++) {
          this.config[index - 1].class = 'passed';
        }
      } else {
        for (let index = 1; index <= this.config.length; index++) {
          this.config[index - 1].class = index < currentStep.currentValue ? 'passed' : (index === currentStep.currentValue ? 'current' : '');
        }
        const percent = (currentStep.currentValue / this.qtySteps) * 100;
        this.containerRef.nativeElement.style.setProperty('--width-green-line', `${percent}%`);
      }
    }
  }
}
