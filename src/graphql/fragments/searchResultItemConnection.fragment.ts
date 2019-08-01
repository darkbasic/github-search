import gql from 'graphql-tag';
import * as fragments from '../../graphql/fragments';

export default gql`
    fragment SearchResultItemConnection on SearchResultItemConnection {
        userCount
        repositoryCount
        pageInfo {
            ...PageInfo
        }
        nodes {
            ...SearchResultItem
        }
    }
    ${fragments.pageInfo}
    ${fragments.searchResultItem}
`;
