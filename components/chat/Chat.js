import React, { useRef } from 'react';
import { useApolloClient, useQuery, useSubscription } from '@apollo/react-hooks';
import { Text, Container, Footer, Content } from 'native-base';
import { GET_LAST_100_MESSAGES } from "../../graphql/query/message";
import Message from "./Message";
import { GET_CURRENT_USER } from "../../graphql/query/user";
import SendMessage from "./SendMessage";
import { MESSAGE_CREATED } from "../../graphql/subscription/message";

const Chat = () => {
  const scrollEl = useRef(null);

  const { loading, data } = useQuery(GET_LAST_100_MESSAGES);
  const client = useApolloClient();

  const { id } = client.readQuery({ query: GET_CURRENT_USER });

  useSubscription(MESSAGE_CREATED, {
    onSubscriptionData: ({ client, subscriptionData: { data: { messageCreated } } }) => {
      const { getLast100Messages } = client.readQuery({ query: GET_LAST_100_MESSAGES });

      if (messageCreated.user.id !== id) {
        client.writeQuery({
          query: GET_LAST_100_MESSAGES,
          data: {
            getLast100Messages: [
              ...getLast100Messages,
              messageCreated
            ]
          }
        });
      }

    }
  });

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
          />)}
      </Content>
      <Footer>
        <SendMessage user_id={id}/>
      </Footer>
    </Container>
  );
};

export default Chat;