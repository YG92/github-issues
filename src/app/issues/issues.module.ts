import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IssueService } from './issue-service/issue.service';
import { SharedModule } from '../shared/shared.module';
import { IssuesRoutingModule } from './issues-routing.module';
import { ReposService } from './repos-service/repos.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    IssuesRoutingModule
  ],
  declarations: [
    IssueListComponent,
    IssueDetailComponent,
  ],
  providers: [
    IssueService,
    ReposService
  ]
})
export class IssuesModule { }
