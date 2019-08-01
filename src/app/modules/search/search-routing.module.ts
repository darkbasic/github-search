import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

export function searchMatcher(url: UrlSegment[]) {
  switch (url[0].path) {
    case 'user':
    case 'repository':
      return {
        consumed: [url[0]],
      };
  }
}

const routes: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full'},
  {path: 'search', component: SearchComponent},
  {
    path: 'search', children: [
      {
        // Match both 'user' and 'repository'
        matcher: searchMatcher, children: [
          {path: ':term', component: SearchResultsComponent},
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}
