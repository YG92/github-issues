import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';

const routes: Routes = [
  { path: 'search', component: IssueListComponent },
  { path: 'search/:owner/:repo', component: IssueListComponent },
  { path: 'issue-detail/:owner/:repo/:number', component: IssueDetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class IssuesRoutingModule { }
