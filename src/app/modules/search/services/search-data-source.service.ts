import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  SearchResultItemFragment,
  SearchGQL, SearchType,
} from '../../../../graphql/types';
import { catchError, finalize, map, take, tap } from 'rxjs/operators';

export class SearchResultsDataSource implements DataSource<SearchResultItemFragment> {

  private searchResultsSubject = new BehaviorSubject<SearchResultItemFragment[]>([]);
  private searchResultsCountSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  private startCursor: string;
  private endCursor: string;

  public searchResultsCount$ = this.searchResultsCountSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private searchGQL: SearchGQL) {
  }

  connect(collectionViewer?: CollectionViewer): Observable<SearchResultItemFragment[]> {
    return this.searchResultsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer) {
    this.searchResultsSubject.complete();
    this.searchResultsCountSubject.complete();
    this.loadingSubject.complete();
  }

  loadSearchResults(type: SearchType, searchTerm: string, pageSize: number, page: 'prev' | 'next' = null) {
    this.loadingSubject.next(true);
    this.searchResultsSubject.next([]);
    this.searchGQL.watch({
      type,
      searchTerm,
      ...(!page && {
        first: pageSize,
      }),
      ...(page === 'next' && {
        first: pageSize,
        after: this.endCursor,
      }),
      ...(page === 'prev' && {
        last: pageSize,
        before: this.startCursor,
      }),
    }).valueChanges.pipe(
      map(result => result.data.search),
      tap(result => this.searchResultsCountSubject.next(result.userCount)),
      tap(result => this.startCursor = result.pageInfo.startCursor),
      tap(result => this.endCursor = result.pageInfo.endCursor),
      map(result => result.nodes),
      catchError(() => of([])),
      take(1),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(res => {
      this.searchResultsSubject.next(res);
    });
  }
}
