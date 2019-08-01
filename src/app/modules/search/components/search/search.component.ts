import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Search {
  searchTerm: string;
}

@Component({
  selector: 'app-search',
  template: `
      <form #form="ngForm" novalidate (ngSubmit)="searchTerm(form.value, form.valid)">
          <div class="container" fxLayout fxLayoutAlign="center center" fxLayoutGap="24px">
              <div class="input" fxFlex="1 1 auto">
                  <mat-form-field>
                      <input matInput type="text" name="searchTerm" placeholder="Search GitHub" ngModel>
                  </mat-form-field>
              </div>

              <button type="submit" mat-raised-button color="primary">Search</button>
          </div>
      </form>
  `,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  async searchTerm(search: Search, isValid: boolean) {
    if (isValid) {
      try {
        await this.router.navigate(['/search/user', search.searchTerm]);
      } catch (e) {
        console.error('Cannot navigate to the search results', e);
      }
    }
  }
}
