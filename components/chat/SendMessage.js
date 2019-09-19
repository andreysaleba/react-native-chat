import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";
import { Button, Form, Item, Input, Text } from 'native-base';
import { CREATE_MESSAGE } from "../../graphql/mutation/message";
import { GET_LAST_100_MESSAGES } from "../../graphql/query/message";

const SendMessage = ({ user_id }) => {
  const [ text, setText ] = useState('');
  const [ createMessage ] = useMutation(CREATE_MESSAGE, {
    update(cache, { data: { createMessage } }) {
      setText('');
      const { getLast100Messages } = cache.readQuery({ query: GET_LAST_100_MESSAGES });

      cache.writeQuery({
        query: GET_LAST_100_MESSAGES,
        data: {
          getLast100Messages: [
            ...getLast100Messages,
            createMessage
          ]
        }
      });
    }
  });
  return (
    <Form>
      <Item>
        <Input
          placeholder="Enter your message"
          value={text}
          onChangeText={setText}
        />
      </Item>
      <Button onPress={() => createMessage({ variables: { message: { user_id, text } } })}>
        <Text>Send message</Text>
      </Button>
    </Form>
  );
};

export default SendMessage;