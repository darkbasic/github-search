import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchGQL, SearchType } from '../../../../../graphql/types';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';
import { SearchResultsDataSource } from '../../services/search-data-source.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-search-results',
  template: `
      <app-search-type-selector [searchTerm]="searchTerm"></app-search-type-selector>

      <div *ngIf="dataSource.loading$ | async" fxLayout="row" fxLayoutAlign="center">
          <mat-spinner></mat-spinner>
      </div>

      <mat-list role="list" *ngIf="(dataSource.connect() | async) as searchItems">
          <mat-list-item role="listitem" *ngFor="let searchItem of searchItems; last as last">
              <app-search-item [searchItem]="searchItem" [type]="type"></app-search-item>
              <mat-divider [inset]="true" *ngIf="!last"></mat-divider>
          </mat-list-item>
      </mat-list>

      <mat-paginator #paginator [length]="dataSource.searchResultsCount$ | async"
                     [pageSize]="pageSize"
                     [pageIndex]="pageIndex"
                     [pageSizeOptions]="[5, 10, 25, 50, 100]"
                     (page)="handlePage($event)">
      </mat-paginator>
  `,
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  pageSize = 5;
  pageIndex = 0;
  searchTerm: string;
  dataSource: SearchResultsDataSource;
  type: SearchType;

  constructor(private route: ActivatedRoute, private router: Router, private searchGQL: SearchGQL) {
  }

  ngOnInit() {
    combineLatest(this.route.parent.url, this.route.params).subscribe(([urlSegments, {term: searchTerm}]) => {
      switch (urlSegments[0].path) {
        case 'user':
          this.type = SearchType.User;
          break;
        case 'repository':
          this.type = SearchType.Repository;
          break;
      }

      this.pageIndex = 0;
      this.searchTerm = searchTerm;
      this.dataSource = new SearchResultsDataSource(this.searchGQL);
      this.dataSource.loadSearchResults(this.type, searchTerm, this.pageSize);
    });
  }

  ngOnDestroy() {
  }

  handlePage(e: PageEvent) {
    if (this.pageSize !== e.pageSize) {
      this.dataSource.loadSearchResults(this.type, this.searchTerm, e.pageSize);
      this.pageSize = e.pageSize;
      this.pageIndex = 0;
    } else {
      const page = this.pageIndex < e.pageIndex ? 'next' : 'prev';
      this.dataSource.loadSearchResults(this.type, this.searchTerm, e.pageSize, page);
      this.pageIndex = e.pageIndex;
    }
  }
}
