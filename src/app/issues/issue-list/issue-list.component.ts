import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IssueService } from '../issue-service/issue.service';
import { MatDialog } from '@angular/material';
import { ErrorAlertComponent } from '../../shared/error-alert/error-alert.component';
import { IssueBaseModel } from './issue-base.model';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {

  issues: IssueBaseModel[];
  loading = false;
  owner: string;
  repo: string;

  form = this.fb.group({
    owner: ['', Validators.required],
    repo: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private issueSrv: IssueService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    const val = this.form.value;
    this.owner = val.owner;
    this.repo = val.repo;
    this.loading = true;
    this.issueSrv.getIssuesList(val.owner, val.repo)
      .subscribe(
        res => {
          this.loading = false;
          this.issues = res;
        },
        err => {
          this.loading = false;
          this.dialog.open(ErrorAlertComponent);
          this.issues = [];
        }
      );
  }

}
