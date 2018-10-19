import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class ReposService {

  constructor(private http: HttpClient) {}

  getRepos(username: string): Observable<string[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/users/${username}/repos`)
      .pipe(
        map(repos => {
          return repos.map(r => r.name);
        })
      );
  }
}
