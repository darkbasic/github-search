import { Component, Input, OnInit } from '@angular/core';
import { RepositoryFragment } from '../../../../../graphql/types';

@Component({
  selector: 'app-search-repository-item',
  template: `
      <div class="container" fxLayout="column" fxLayoutGap="3px">
          <div fxFlex="1 1 auto" fxLayout="row" fxLayoutGap="10px">
              <div class="name">
                  <a href="{{ searchItem.url }}">
                      {{ searchItem.nameWithOwner }}
                  </a>
              </div>
              <div class="language" *ngIf="searchItem.primaryLanguage" fxLayout="row" fxLayoutAlign="start center">
                  <mat-icon matListIcon>lens</mat-icon>
                  <div>{{ searchItem.primaryLanguage?.name }}</div>
              </div>
              <div class="stars" fxLayout="row" fxLayoutAlign="start center">
                  <mat-icon matListIcon>star</mat-icon>
                  <div>{{ searchItem.stargazers?.totalCount }}</div>
              </div>
          </div>
          <div class="description" fxFlex="1 1 auto">{{ searchItem.description }}</div>
          <div fxFlex="1 1 auto" fxLayout="row" fxLayoutGap="10px">
              <div class="updateDate" *ngIf="searchItem.updatedAt">Updated on {{ searchItem.updatedAt | date }}</div>
          </div>
      </div>
  `,
  styleUrls: ['./search-repository-item.component.scss']
})
export class SearchRepositoryItemComponent implements OnInit {
  @Input()
  searchItem: RepositoryFragment;

  constructor() { }

  ngOnInit() {
  }

}
