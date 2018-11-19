import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { IssueListComponent } from './issue-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReposService } from '../repos-service/repos.service';
import { Observable, of } from 'rxjs';
import { MaterialModule } from '../../material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { IssueService } from '../issue-service/issue.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDataService } from '../store-data-service/store-data.service';

class ReposServiceMocked {
  getRepos(): Observable<string[]> {
    return of(['str1']);
  }
}

describe('IssueListComponent', () => {
  let component: IssueListComponent;
  let fixture: ComponentFixture<IssueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueListComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .overrideComponent(IssueListComponent, {
      set: {
        providers: [
          { provide: ReposService, useClass: ReposServiceMocked },
          { provide: StoreDataService, useValue: {} },
          { provide: IssueService, useValue: {} }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make an api call when value changes', fakeAsync(() => {
    const owner = component.form.get('owner');
    owner.setValue('someValue');
    tick(400);
    expect(component.repos).toEqual(['str1']);
  }));

});
