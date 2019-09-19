import gql from 'graphql-tag';

export const FIND_OR_CREATE_USER = gql`
  mutation findOrCreateUser($user: UserInput!) {
    findOrCreateUser(user: $user) {
      id
      username
    }
  }
`;