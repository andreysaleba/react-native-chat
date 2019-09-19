import React from 'react';
import { Card, CardItem, Body, Text } from 'native-base';

const Message = ({ text, user, isMyMessage }) => (
  <Card>
    <CardItem>
      <Body>
        <Text>
          @{user && user.username}
        </Text>
        <Text>
          {text}
        </Text>
      </Body>
    </CardItem>
  </Card>
);

export default Message;