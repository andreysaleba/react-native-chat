import React, { useState } from 'react';
import { Button, Text, Container, Header, Content, Form, Item, Input } from 'native-base';
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from 'react-router-native';
import { FIND_OR_CREATE_USER } from "../graphql/mutation/user";
import { GET_CURRENT_USER } from "../graphql/query/user";

const UsernameForm = ({ history }) => {
  const [ username, setUsername ] = useState('');
  const [ findOrCreateUser ] = useMutation(FIND_OR_CREATE_USER, {
    update(cache, { data: { findOrCreateUser: { id, username } } }) {
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: { id, username },
      });
    }
  });

  return (
    <Container>
      <Header/>
      <Content>
        <Form>
          <Item>
            <Input
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
          </Item>
          <Button
            primary
            onPress={() =>
              findOrCreateUser({ variables: { user: { username } } })
                .then((r) => {
                  history.push('/chat');
                })
            }
          >
            <Text>Enter chat</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default withRouter(UsernameForm);