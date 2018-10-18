import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';

const routes: Routes = [
  { path: 'issue-list', component: IssueListComponent },
  { path: 'issue-detail', component: IssueDetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MainRoutingModule { }
