import gql from 'graphql-tag';

export default gql`
    fragment User on User {
        id
        login
        name
        avatarUrl
        bio
        email
        location
        starredRepositories {
            totalCount
        }
        followers {
            totalCount
        }
    }
`;
