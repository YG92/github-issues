import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule, MatPaginatorIntl,
  MatPaginatorModule,
  MatProgressSpinnerModule, MatTooltipModule,
} from '@angular/material';
import { russianPaginatorIntl } from './russian-paginator-intl';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTooltipModule
  ],
  exports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTooltipModule
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: russianPaginatorIntl() }]
})
export class MaterialModule { }
