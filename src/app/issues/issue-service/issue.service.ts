import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { IssueBaseModel } from '../issue-list/issue-base.model';
import { IssueDetailModel } from '../issue-detail/issue-detail.model';

export interface GithubResp {
  items: IssueBaseModel[];
  incomplete_results: boolean;
  total_count: number;
}

@Injectable()
export class IssueService {

  constructor(private http: HttpClient) {}

  mapIssue(issue): IssueBaseModel {
    return {
      number: issue.number,
      title: issue.title,
      created_at: issue.created_at
    };
  }

  getIssuesList(owner: string, repo: string, pageIndex: number, pageSize: number): Observable<GithubResp> {
    return this.http.get<any>(`${environment.apiUrl}/search/issues?q=repo:${owner}/${repo}&page=${pageIndex}&per_page=${pageSize}`)
      .pipe(
        map(issues => {
          issues.items = issues.items.map(i => this.mapIssue(i));
          return issues;
        })
      );
  }

  getIssue(owner: string, repo: string, number: number): Observable<IssueDetailModel> {
    return this.http.get<any>(`${environment.apiUrl}/repos/${owner}/${repo}/issues/${number}`)
      .pipe(
        map(i => ({
          ...this.mapIssue(i),
          text: i.body,
          user: {
            avatar: i.user.avatar_url,
            profile: i.user.html_url,
            username: i.user.login
          }
        }))
      );
  }
}
