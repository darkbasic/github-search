import gql from 'graphql-tag';
import * as fragments from '../../graphql/fragments';

export const searchQuery = gql`
    query Search($type: SearchType!, $searchTerm: String!, $first: Int, $after: String, $last: Int, $before: String) {
        search(
            first: $first
            after: $after
            last: $last
            before: $before
            query: $searchTerm
            type: $type) {
            ...SearchResultItemConnection
        }
    }
    ${fragments.searchResultItemConnection}
`;
