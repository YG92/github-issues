import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  exports: [
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
