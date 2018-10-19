import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../issue-service/issue.service';
import { ErrorAlertComponent } from '../../shared/error-alert/error-alert.component';
import { MatDialog } from '@angular/material';
import { IssueDetailModel } from './issue-detail.model';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {

  issue: IssueDetailModel;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private issueSrv: IssueService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getIssue();
  }

  getIssue(): void {
    const owner = this.route.snapshot.paramMap.get('owner');
    const repo = this.route.snapshot.paramMap.get('repo');
    const number = this.route.snapshot.paramMap.get('number');
    this.issueSrv.getIssue(owner, repo, +number)
      .subscribe(
        res => {
          this.loading = false;
          this.issue = res;
        },
        err => {
          this.loading = false;
          this.dialog.open(ErrorAlertComponent);
        }
      );
  }

  goBack(): void {
    this.router.navigate(['/issue-list']);
  }

}
