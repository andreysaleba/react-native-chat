import React, { Component } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { Ionicons } from '@expo/vector-icons';
import { Platform, SafeAreaView } from "react-native";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { NativeRouter, Route } from "react-router-native";
import { getMainDefinition } from "apollo-utilities";
import Chat from "./components/chat/Chat";
import UsernameForm from "./components/UsernameForm";

const BACKEND_URL = Platform.OS === 'ios'
  ? 'localhost:3000'
  : '10.0.2.2:3000';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  get link() {
    const httpLink = new HttpLink({
      uri: `http://${BACKEND_URL}/graphql`
    });

    const wsLink = new WebSocketLink({
      uri: `ws://${BACKEND_URL}/graphql`,
      options: {
        reconnect: true
      }
    });

    return split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    );
  }

  async componentDidMount() {
    const cache = new InMemoryCache();
    this.client = new ApolloClient({
      link: this.link,
      cache
    });
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading/>;
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ApolloProvider client={this.client}>
          <NativeRouter>
            <Route exact path="/" component={UsernameForm}/>
            <Route path="/chat" component={Chat}/>
          </NativeRouter>
        </ApolloProvider>
      </SafeAreaView>
    );
  }
}