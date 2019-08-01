import { Component, Input, OnInit } from '@angular/core';
import { UserFragment } from '../../../../../graphql/types';

@Component({
  selector: 'app-search-user-item',
  template: `
      <div class="container" fxLayout="row" fxLayoutGap="10px">
          <img src="{{ searchItem.avatarUrl }}" width="48px" height="48px"/>
          <div fxLayout="column" fxLayoutGap="3px">
              <div fxFlex="1 1 auto" fxLayout="row" fxLayoutGap="10px">
                  <div class="login">
                      <a href="https://github.com/{{ searchItem.login }}">
                          {{ searchItem.login }}
                      </a>
                  </div>
                  <div class="name">{{ searchItem.name }}</div>
              </div>
              <div fxFlex="1 1 auto" class="bio">{{ searchItem?.bio }}</div>
              <div fxFlex="1 1 auto" *ngIf="searchItem?.location" fxLayout="row" fxLayoutGap="10px">
                  <div class="location" fxLayout="row" fxLayoutAlign="start center">
                      <mat-icon matListIcon>location_on</mat-icon>
                      <div>{{ searchItem.location }}</div>
                  </div>
                  <div class="stars" fxLayout="row" fxLayoutAlign="start center">
                      <mat-icon matListIcon>star</mat-icon>
                      <div>{{ searchItem.starredRepositories.totalCount }}</div>
                  </div>
                  <div class="followers" fxLayout="row" fxLayoutAlign="start center">
                      <mat-icon matListIcon>people</mat-icon>
                      <div>{{ searchItem.followers.totalCount }}</div>
                  </div>
              </div>
          </div>
      </div>
  `,
  styleUrls: ['./search-user-item.component.scss']
})
export class SearchUserItemComponent implements OnInit {
  @Input()
  searchItem: UserFragment;

  constructor() {
  }

  ngOnInit() {
  }

}
