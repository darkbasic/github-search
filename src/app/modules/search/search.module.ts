import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule, MatTabsModule,
} from '@angular/material';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchUserItemComponent } from './components/search-user-item/search-user-item.component';
import { SearchRepositoryItemComponent } from './components/search-repository-item/search-repository-item.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { SearchTypeSelectorComponent } from './components/search-type-selector/search-type-selector.component';


@NgModule({
  declarations: [
    SearchComponent,
    SearchResultsComponent,
    SearchUserItemComponent,
    SearchRepositoryItemComponent,
    SearchItemComponent,
    SearchTypeSelectorComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    // Forms
    FormsModule,
    // Flex Layout
    FlexLayoutModule,
    // Material
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTabsModule,
  ],
  entryComponents: [
    SearchUserItemComponent,
    SearchRepositoryItemComponent,
  ],
})
export class SearchModule {
}
