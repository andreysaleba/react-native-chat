import gql from 'graphql-tag';

export const MESSAGE_CREATED = gql`
  subscription messageCreated {
    messageCreated {
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