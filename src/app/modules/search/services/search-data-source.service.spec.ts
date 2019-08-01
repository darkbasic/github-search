import { TestBed } from '@angular/core/testing';

import { SearchResultsDataSource } from './search-data-source.service';
import { APOLLO_TESTING_CACHE, ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../../../../graphql/fragmentTypes.json';
import { SearchType } from '../../../../graphql/types';

describe('SearchDataSourceService', () => {
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [
        SearchResultsDataSource,
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
    });

    controller = TestBed.get(ApolloTestingController);
  });

  it('should retrieve three entries', () => {
    const service: SearchResultsDataSource = TestBed.get(SearchResultsDataSource);
    service.loadSearchResults(SearchType.User, 'mario', 3);
    const req = controller.expectOne('Search', 'Service search operation');
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
            }, {
              id: 'MDEwOlJlcG9zaXRvcnkxNTA1ODczMjM=',
              description: '1er test',
              nameWithOwner: 'www333xxx333www/zzzgit',
              primaryLanguage: null,
              updatedAt: '2018-09-27T12:59:22Z',
              url: 'https://github.com/www333xxx333www/zzzgit',
              stargazers: {totalCount: 0, __typename: 'StargazerConnection'},
              __typename: 'Repository'
            }],
            __typename: 'SearchResultItemConnection'
          }
        }
      }
    );
    controller.verify();
    service.connect().subscribe(res => expect(res.length).toBe(3));
  });
});
