import gql from 'graphql-tag';

export const CREATE_MESSAGE = gql`
  mutation createMessage($message: MessageInput!) {
    createMessage(message: $message) {
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