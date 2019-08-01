import gql from 'graphql-tag';
import * as fragments from '../../graphql/fragments';

export default gql`
    fragment SearchResultItem on SearchResultItem {
        ... on User {
            ...User
        }
        ... on Repository {
            ...Repository
        }
    }
    ${fragments.user}
    ${fragments.repository}
`;
