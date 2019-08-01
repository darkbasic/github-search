import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
      <mat-toolbar color="primary">
          <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Menu">
              <mat-icon>menu</mat-icon>
          </button>

          <mat-menu #menu="matMenu">
              <button mat-menu-item (click)="navigateTo('/')">
                  <mat-icon>home</mat-icon>
                  <span>Home</span>
              </button>
              <button mat-menu-item (click)="navigateTo('search')">
                  <mat-icon>search</mat-icon>
                  <span>Search</span>
              </button>
          </mat-menu>

          <div class="title">GitHub</div>
      </mat-toolbar>

      <router-outlet></router-outlet>

      <div class="footer">
          © 2019 GitHub, Inc.
      </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  async navigateTo(destination: string) {
    try {
      await this.router.navigate([destination]);
    } catch (e) {
      console.error(`Cannot navigate to ${destination}`, e);
    }
  }
}
