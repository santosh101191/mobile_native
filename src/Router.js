import React from "react";
import { Platform, StatusBar } from "react-native";
import {createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from "react-navigation";

import UserProfile from './Components/UserProfile';
import SideBar from './Components/Shared/SideBar';
import Login from "./Components/Authentication/Login";
import Users from "./Components/Users";
import Albums from "./Components/Albums";
import Album from "./Components/Album";
import Home from "./Components/Home";
import RandomQuotes from "./Components/RandomQuotes";
const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : -5
};

export const Router = createStackNavigator(
  { //whichever component should be opened after login must be written first
    // UserProfile: {
    //   screen: UserProfile
    // },
    Home: {
      screen: Home,
      header:'none'
    },
    Albums: {
      screen: Albums,
    },
    Album: {
      screen: Album,
      params: {
        albumId: null
      }
    },
    Users: {
      screen: Users,
    },
    UserProfile: {
      screen: UserProfile,
      params:{
        username: 'santoshg10'
      }
    },
    RandomQuotes: {
      screen: RandomQuotes
    },
    SideBar: {
      screen: SideBar
    }
  }
);
export const SignedOut = createStackNavigator({
  Login: {
    screen: Login
  }
});
export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: Router
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};