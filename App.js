import React from 'react';
import { StyleSheet,  View } from 'react-native';
import { Container, Text, Content, StyleProvider} from 'native-base';
import HeaderApp from './src/Components/Shared/Header';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import {Font } from 'expo';
import { createRootNavigator } from "./src/Router";
import { isSignedIn } from "./src/Auth";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import  reducer  from './src/Reducers/AllReducers'
const store = createStore(reducer, {}, applyMiddleware(thunk));
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }
 
  componentDidMount() {
    Font.loadAsync({
      'Roboto': require('./assets/Roboto/Roboto-Bold.ttf'),
      'Roboto_medium': require('./assets/Roboto/Roboto-Medium.ttf'),
    }).then(res =>{
      isSignedIn()
        .then((res) => {
          this.setState({ signedIn: res, checkedSignIn: true })
        })
        .catch(err => alert("An error occurred"));
    });
   
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
  return  ( <Provider store={store}>
    <Layout style={{backgroundColor: '#2c3e50'}} />
            </Provider>
          );
  }
}




