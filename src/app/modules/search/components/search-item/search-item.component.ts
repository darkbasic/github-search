import {
  AfterContentInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {RepositoryFragment, SearchResultItemFragment, SearchType, UserFragment} from '../../../../../graphql/types';
import { SearchUserItemComponent } from '../search-user-item/search-user-item.component';
import { SearchRepositoryItemComponent } from '../search-repository-item/search-repository-item.component';

@Component({
  selector: 'app-search-item',
  template: `
      <ng-container #entry></ng-container>
  `,
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit, AfterContentInit {
  @Input() searchItem: RepositoryFragment | UserFragment;
  @Input() type: SearchType;

  @ViewChild('entry', {static: true, read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    let factory: ComponentFactory<SearchUserItemComponent | SearchRepositoryItemComponent>;
    switch (this.type) {
      case SearchType.User:
        factory = this.resolver.resolveComponentFactory(SearchUserItemComponent);
        break;
      case SearchType.Repository:
        factory = this.resolver.resolveComponentFactory(SearchRepositoryItemComponent);
        break;
    }
    const componentRef = this.entry.createComponent(factory);
    componentRef.instance.searchItem = this.searchItem;
  }

}
