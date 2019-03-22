import React, { Component } from 'react';
import {View} from 'react-native';
import { Container, Header, Left, Body, Right, Title, Subtitle } from 'native-base';
export default class HeaderApp extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View>
        <Header>
          <Left />
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
      </View>
    );
  }
}