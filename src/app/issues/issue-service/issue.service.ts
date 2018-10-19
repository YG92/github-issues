import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { IssueModel } from '../issue.model';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class IssueService {

  constructor(private http: HttpClient) {}

  getIssuesList(owner: string, repo: string): Observable<IssueModel[]> {
    return this.http.get<IssueModel[]>(`${environment.apiUrl}/repos/${owner}/${repo}/issues`)
      .pipe(
        map(issues => {
          return issues.map(i => {
            return {
              number: i.number,
              title: i.title,
              created_at: i.created_at
            };
          });
        })
      );
  }
}
