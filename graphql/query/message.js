import gql from 'graphql-tag';

export const GET_LAST_100_MESSAGES = gql`
  query getLast100Messages {
    getLast100Messages {
      id
      text
      created_at
      user {
        id
        username
      }
    }
  }
`;