import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MainRoutingModule
  ],
  declarations: [
    IssueListComponent,
    IssueDetailComponent,
  ]
})
export class MainModule { }
