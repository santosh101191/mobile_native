import React, { Component } from 'react';
import { View, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Container,Content, Alert, Input, Item, Form, Label, Button, Text, Card, CardItem, H2 } from 'native-base';
import {signIn} from '../../Auth';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {SignedIn, createRootNavigator} from '../../Router'
import App from '../../../App';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      accessCode: ''
    }
    this.signIn = this.signIn.bind(this);
  }
  

  signIn() {
    const { username, password } = this.state
    signIn(username, password).then(res => {
     //Alert.alert("Welcome")
    this.props.navigation.navigate("Home")
    })
  }

  render() {
    var dimensions = Dimensions.get('window')
    return (
      <Container >
              <Card>
              <Form>
                <Item floatingLabel style={{height: 50}}>
                      <Label>Email</Label>
                  <Input value={this.state.username} onChangeText={(e)=> this.setState({username:e})} />
                </Item>
                  <Item floatingLabel last style={{ height: 50 }}>
                  <Label>Password</Label>
                    <Input type="password" value={this.state.password} onChangeText={(e) => this.setState({ password: e })} secureTextEntry />
                </Item>
              </Form>
              </Card>
              <Button primary full rounded onPress={this.signIn} style={{ height: 50 }}><Text> Login </Text></Button>
      </Container>
    );
  }
}

