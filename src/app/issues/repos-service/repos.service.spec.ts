import { TestBed } from '@angular/core/testing';
import { ReposService } from './repos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

const testArray = new Array(10).map((i, ind) => `string${ind}`);

describe('ReposService', () => {
  let http: HttpTestingController;
  let reposSrv: ReposService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReposService]
    });
    http = TestBed.get(HttpTestingController);
    reposSrv = TestBed.get(ReposService);
  });

  it('should return list of repos', () => {
    reposSrv.getRepos('someString')
      .subscribe(res => {
        expect(res).toEqual(testArray);
      });
    const req = http.expectOne({
      url: `${environment.apiUrl}/users/someString/repos`,
      method: 'GET'
    });
    req.flush(testArray);
    http.verify();
  });

});
