import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorAlertComponent } from './error-alert/error-alert.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ErrorAlertComponent],
  exports: [ErrorAlertComponent],
  entryComponents: [ErrorAlertComponent]
})
export class SharedModule { }
