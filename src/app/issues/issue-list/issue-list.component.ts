import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IssueService } from '../issue-service/issue.service';
import { MatDialog } from '@angular/material';
import { ErrorAlertComponent } from '../../shared/error-alert/error-alert.component';
import { IssueBaseModel } from './issue-base.model';
import { debounceTime, catchError, switchMap, map, startWith, finalize, tap } from 'rxjs/operators';
import { ReposService } from '../repos-service/repos.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
  pageIndex: number;
  repos: string[];
  filteredRepos: Observable<string[]>;

  resultsLength = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  form = this.fb.group({
    owner: ['', Validators.required],
    repo: ['', Validators.required]
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private issueSrv: IssueService,
    private repoSrv: ReposService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.owner = params.get('owner');
      this.repo = params.get('repo');
      this.pageIndex = params.get('pageIndex') ? +params.get('pageIndex') : 1;
      if (this.owner && this.repo) { this.getIssues(); }
    });
    this.getRepos();
  }

  get repoControl(): FormControl {
    return this.form.get('repo') as FormControl;
  }

  private handleGetReposError(): Observable<any[]> {
    this.dialog.open(ErrorAlertComponent, { data: { message: 'Не удалось загрузить репозитории' } });
    return of([]);
  }

  private filterRepos(v): string[] {
    const value = v.toLowerCase();
    return this.repos.filter(repo => repo.toLowerCase().includes(value));
  }

  private validateRepoInput(v) {
    const value = v.toLowerCase();
    if (!this.repos.includes(value)) {
      this.repoControl.setErrors({ notInList: true });
    }
  }

  getFilteredRepos(): Observable<string[]> {
    return this.repoControl.valueChanges
      .pipe(
        startWith(''),
        tap(value => this.validateRepoInput(value)),
        map(value => this.filterRepos(value))
      );
  }

  getRepos(): void {
    this.form.get('owner').valueChanges
      .pipe(
        debounceTime(400),
        switchMap(username => {
          if (username.length > 0) {
            return this.repoSrv.getRepos(username)
              .pipe(
                catchError(() => this.handleGetReposError()
                )
              );
          }
          return of([]);
        })
      )
      .subscribe(res => {
        this.repos = res;
        this.filteredRepos = this.getFilteredRepos();
      });
  }

  getIssues(): void {
    this.loading = true;
    this.issueSrv.getIssuesList(this.owner, this.repo, this.pageIndex, this.pageSize)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        res => {
          this.resultsLength = res.total_count;
          this.issues = res.items;
        },
        () => {
          this.dialog.open(ErrorAlertComponent);
          this.issues = [];
        }
      );
  }

  onSubmit(): void {
    const val = this.form.value;
    this.router.navigate(['search', val.owner, val.repo, 1]);
  }

  pageEvent(ev): void {
    this.pageSize = ev.pageSize;
    this.pageIndex = ev.pageIndex + 1;
    if (this.owner && this.repo) {
      this.getIssues();
    }
  }

}
