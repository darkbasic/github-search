import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTypeSelectorComponent } from './search-type-selector.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTabsModule } from '@angular/material';

describe('SearchTypeSelectorComponent', () => {
  let component: SearchTypeSelectorComponent;
  let fixture: ComponentFixture<SearchTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        // Material
        MatTabsModule,
      ],
      declarations: [ SearchTypeSelectorComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain two links', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('a').length).toBe(2);
  });

  it('should lead to /search/user/mario', () => {
    component.searchTerm = 'mario';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').href).toContain('/search/user/mario');
  });
});
