import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-type-selector',
  template: `
      <nav mat-tab-nav-bar>
          <a mat-tab-link
             *ngFor="let link of navLinks"
             routerLink="/search/{{link.url}}/{{searchTerm}}"
             routerLinkActive #rla="routerLinkActive"
             [active]="rla.isActive">
              {{link.text}}
          </a>
      </nav>
  `,
  styleUrls: ['./search-type-selector.component.scss']
})
export class SearchTypeSelectorComponent implements OnInit {
  @Input() searchTerm: string;

  navLinks = [
    {url: 'user', text: 'Users'},
    {url: 'repository', text: 'Repositories'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
