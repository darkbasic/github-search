import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  MatDividerModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { APOLLO_TESTING_CACHE, ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../../../../../graphql/fragmentTypes.json';

describe('SearchResultsComponent', () => {
  let controller: ApolloTestingController;
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ApolloTestingModule,
        // Material
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatListModule,
        MatDividerModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              url: of([{path: 'user'}]),
            },
            params: of({term: 'mario'}),
          },
        },
        {
          provide: APOLLO_TESTING_CACHE,
          useFactory() {
            return new InMemoryCache({
              fragmentMatcher: new IntrospectionFragmentMatcher({
                introspectionQueryResultData
              }),
            });
          },
        },
      ],
      declarations: [SearchResultsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.get(ApolloTestingController);
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should contain two search entries', () => {
    const req = controller.expectOne('Search', 'Search operation');
    req.flush({
        data: {
          search: {
            userCount: 2,
            repositoryCount: 2,
            pageInfo: {
              endCursor: 'Y3Vyc29yOjU=',
              hasNextPage: true,
              hasPreviousPage: false,
              startCursor: 'Y3Vyc29yOjE=',
              __typename: 'PageInfo'
            },
            nodes: [{
              id: 'MDEwOlJlcG9zaXRvcnkxMzIzNTcxMDM=',
              description: 'This is a collection of instrumentals songs',
              nameWithOwner: 'vincenzomascia90/ZZZGitVincenzo',
              primaryLanguage: null,
              updatedAt: '2018-05-06T17:10:04Z',
              url: 'https://github.com/vincenzomascia90/ZZZGitVincenzo',
              stargazers: {totalCount: 0, __typename: 'StargazerConnection'},
              __typename: 'Repository'
            }, {
              id: 'MDEwOlJlcG9zaXRvcnk1MjcyNDc3NQ==',
              description: 'desc001-zzzgit001; init README; add Ada; add GNU GPLv3.0',
              nameWithOwner: 't-offline/zzzgit001',
              primaryLanguage: null,
              updatedAt: '2016-02-28T14:20:22Z',
              url: 'https://github.com/t-offline/zzzgit001',
              stargazers: {totalCount: 0, __typename: 'StargazerConnection'},
              __typename: 'Repository'
            }],
            __typename: 'SearchResultItemConnection'
          }
        }
      }
    );
    controller.verify();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('app-search-item').length).toBe(2);
  });
});
