import React, { Component } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import Chat from "./components/chat/Chat";
import UsernameForm from "./components/UsernameForm";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    const cache = new InMemoryCache();
    this.client = new ApolloClient({
      link: new HttpLink({
        uri: 'http://localhost:3000/graphql'
      }),
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