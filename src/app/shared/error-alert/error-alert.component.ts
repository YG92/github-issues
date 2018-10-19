import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertComponent implements OnInit {

  public dialogRef: MatDialogRef<ErrorAlertComponent>

  ngOnInit() {
  }

}
