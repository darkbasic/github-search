import gql from 'graphql-tag';

export default gql`
    fragment Repository on Repository {
        id
        description
        nameWithOwner
        primaryLanguage {
            id
            name
        }
        updatedAt
        url
        stargazers {
            totalCount
        }
    }
`;
