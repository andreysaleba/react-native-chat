import React, { useRef } from 'react';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { Text, Container, Footer, Content, Form, Item, Input } from 'native-base';
import { GET_LAST_100_MESSAGES } from "../../graphql/query/message";
import Message from "./Message";
import { GET_CURRENT_USER } from "../../graphql/query/user";
import SendMessage from "./SendMessage";

const Chat = () => {
  const scrollEl = useRef(null);

  const { loading, data } = useQuery(GET_LAST_100_MESSAGES);
  const client = useApolloClient();

  const { id } = client.readQuery({ query: GET_CURRENT_USER });

  if (loading) return <Text>Loading ...</Text>;
  return (
    <Container>
      <Content
        ref={scrollEl}
        onContentSizeChange={() => {
          scrollEl.current.wrappedInstance.scrollToEnd({ animated: true });
        }}
      >
        {data.getLast100Messages.map(m =>
          <Message
            {...m}
            key={m.id}
            isMyMessage={id === m.user_id}
          />)}
      </Content>
      <Footer>
        <SendMessage user_id={id}/>
      </Footer>
    </Container>
  );
};

export default Chat;