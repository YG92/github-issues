import { TestBed } from '@angular/core/testing';
import { GithubResp, IssueService } from './issue.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { IssueDetailModel } from '../issue-detail/issue-detail.model';

describe('IssueService', () => {
  let http: HttpTestingController;
  let issueSrv: IssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IssueService]
    });
    http = TestBed.get(HttpTestingController);
    issueSrv = TestBed.get(IssueService);
  });

  afterEach(() => {
    http.verify();
  });

  it('should get list of issues', () => {
    const testData = {
      'total_count': 20,
      'incomplete_results': false,
      'items': [
        {
          'id': 35802,
          'node_id': 'MDU6SXNzdWUzNTgwMg==',
          'number': 132,
          'title': 'Line Number Indexes Beyond 20 Not Displayed',
          'user': {
            'login': 'Nick3C',
            'avatar_url': 'https://secure.gravatar.com/avatar/934442aadfe3b2f4630510%2Fgravatars%2Fgravatar-user-420.png',
            'html_url': 'https://github.com/Nick3C',
          },
          'body': '...',
          'created_at': '2009-07-12T20:10:41Z',
        },
        {
          'id': 35802,
          'node_id': 'MDU6SXNzdWUzNTgwMg==',
          'number': 132,
          'title': 'Line Number Indexes Beyond 20 Not Displayed',
          'user': {
            'login': 'Nick3C',
            'avatar_url': 'https://secure.gravatar.com/avatar/934442aadfe3b2f4630510%2Fgravatars%2Fgravatar-user-420.png',
            'html_url': 'https://github.com/Nick3C',
          },
          'body': '...',
          'created_at': '2009-07-12T20:10:41Z',
        }
      ]
    };

    const testResult: GithubResp = {
      'total_count': 20,
      'incomplete_results': false,
      'items': [
        {
          'number': 132,
          'title': 'Line Number Indexes Beyond 20 Not Displayed',
          'created_at': '2009-07-12T20:10:41Z',
        },
        {
          'number': 132,
          'title': 'Line Number Indexes Beyond 20 Not Displayed',
          'created_at': '2009-07-12T20:10:41Z',
        }
      ]
    };
    const pageSize = 2;
    issueSrv.getIssuesList('testOwner', 'testRepo', 1, pageSize)
      .subscribe(res => {
        expect(res).toEqual(testResult);
        expect(res.items.length).toEqual(pageSize);
      });
    const req = http.expectOne({
      url: `${environment.apiUrl}/search/issues?q=repo:testOwner/testRepo&page=1&per_page=2`,
      method: 'GET'
    });
    req.flush(testData);
  });

  it('should get single issue', () => {
    const testResp: IssueDetailModel = {
      'number': 1347,
      'title': 'Found a bug',
      'text': 'I\'m having a problem with this.',
      'user': {
        'username': 'octocat',
        'avatar': 'https://github.com/images/error/octocat_happy.gif',
        'profile': 'https://github.com/octocat',
      },
      'created_at': '2011-04-22T13:33:48Z',
    };

    const testData = {
      'url': 'https://api.github.com/repos/octocat/Hello-World/issues/1347',
      'repository_url': 'https://api.github.com/repos/octocat/Hello-World',
      'html_url': 'https://github.com/octocat/Hello-World/issues/1347',
      'number': 1347,
      'state': 'open',
      'title': 'Found a bug',
      'body': 'I\'m having a problem with this.',
      'user': {
        'login': 'octocat',
        'id': 1,
        'node_id': 'MDQ6VXNlcjE=',
        'avatar_url': 'https://github.com/images/error/octocat_happy.gif',
        'gravatar_id': '',
        'url': 'https://api.github.com/users/octocat',
        'html_url': 'https://github.com/octocat',
        'repos_url': 'https://api.github.com/users/octocat/repos',
        'type': 'User',
        'site_admin': false
      },
      'locked': true,
      'active_lock_reason': 'too heated',
      'comments': 0,

      'closed_at': null,
      'created_at': '2011-04-22T13:33:48Z',
      'updated_at': '2011-04-22T13:33:48Z',

    };
    issueSrv.getIssue('testOwner', 'testRepo', 1347)
      .subscribe(res => {
        expect(res).toEqual(testResp);
      });
    const req = http.expectOne({
      url: `${environment.apiUrl}/repos/testOwner/testRepo/issues/1347`,
      method: 'GET'
    });
    req.flush(testData);
  });

});
