import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../issue-service/issue.service';
import { ErrorAlertComponent } from '../../shared/error-alert/error-alert.component';
import { MatDialog } from '@angular/material';
import { IssueDetailModel } from './issue-detail.model';
import { finalize } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {

  issue: IssueDetailModel;
  loading = true;
  owner: string;
  repo: string;
  number: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private issueSrv: IssueService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getIssue();
  }

  getIssue(): void {
    this.owner = this.route.snapshot.paramMap.get('owner');
    this.repo = this.route.snapshot.paramMap.get('repo');
    this.number = +this.route.snapshot.paramMap.get('number');
    this.issueSrv.getIssue(this.owner, this.repo, this.number)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        res => this.issue = res,
        () => this.dialog.open(ErrorAlertComponent)
      );
  }

  goBack(): void {
    this.location.back();
  }

}
