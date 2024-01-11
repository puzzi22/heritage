import { CdkStepper } from '@angular/cdk/stepper';
import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
})
export class StepperComponent extends CdkStepper implements OnInit, DoCheck {
  @Input() linearModeSelected = true;
  @Output() stepChanged = new EventEmitter<number>();

  private lastSelectedIndex!: number;

  ngOnInit(): void {
    this.linear = this.linearModeSelected;
    this.lastSelectedIndex = this.selectedIndex;
  }

  ngDoCheck(): void {
    if (this.selectedIndex !== this.lastSelectedIndex) {
      this.lastSelectedIndex = this.selectedIndex;
      this.stepChanged.emit(this.selectedIndex);
    }
  }
  
  onClick(index: number): void {
    this.selectedIndex = index;
    this.stepChanged.emit(index);
  }
}