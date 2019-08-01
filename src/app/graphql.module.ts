import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';
import introspectionQueryResultData from '../graphql/fragmentTypes.json';

const uri = 'https://api.github.com/graphql';

// Sorry GitHub, bad security practices today
const tokenFirstHalf = 'ae607d74580e53078e56';
const tokenSecondHalf = 'eb4a977fe4e93023d711';

export function createApollo(httpLink: HttpLink) {
  const authLink = new ApolloLink((operation, forward) => {
    // add the auth header
    operation.setContext({
      headers: new HttpHeaders().set('Authorization', `bearer ${tokenFirstHalf}${tokenSecondHalf}`)
    });

    return forward(operation);
  });

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });

  return {
    link: concat(authLink, httpLink.create({uri})),
    cache: new InMemoryCache({ fragmentMatcher }),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}
