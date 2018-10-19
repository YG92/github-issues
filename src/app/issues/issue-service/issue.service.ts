import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { map } from 'rxjs/internal/operators';
import { IssueBaseModel } from '../issue-list/issue-base.model';
import { IssueDetailModel } from '../issue-detail/issue-detail.model';

@Injectable()
export class IssueService {

  constructor(private http: HttpClient) {}

  getUrl(owner: string, repo: string, number?: number): string {
    const url = `${environment.apiUrl}/repos/${owner}/${repo}/issues`;
    return number ? `${url}/${number}` : url;
  }

  mapIssue(issue): IssueBaseModel {
    return {
      number: issue.number,
      title: issue.title,
      created_at: issue.created_at
    };
  }

  getIssuesList(owner: string, repo: string): Observable<IssueBaseModel[]> {
    return this.http.get<any[]>(this.getUrl(owner, repo))
      .pipe(
        map(issues => {
          return issues.map(i => this.mapIssue(i));
        })
      );
  }

  getIssue(owner: string, repo: string, number: number): Observable<IssueDetailModel> {
    return this.http.get<any>(this.getUrl(owner, repo, number))
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
