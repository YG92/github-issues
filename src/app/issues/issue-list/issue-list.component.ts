import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IssueService } from '../issue-service/issue.service';
import { MatDialog } from '@angular/material';
import { ErrorAlertComponent } from '../../shared/error-alert/error-alert.component';
import { IssueBaseModel } from './issue-base.model';
import { debounceTime } from 'rxjs/operators';
import { switchMap } from 'rxjs/internal/operators';
import { ReposService } from '../repos-service/repos.service';

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
  repos: string[];

  form = this.fb.group({
    owner: ['', Validators.required],
    repo: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private issueSrv: IssueService,
    private repoSrv: ReposService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.form.controls['owner'].valueChanges
      .pipe(
        debounceTime(400),
        switchMap(username => this.repoSrv.getRepos(username))
      ).subscribe(res => {
        this.repos = res;
    });
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
