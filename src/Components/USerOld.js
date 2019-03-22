import React from "react";
import { AppRegistry, Alert } from "react-native";
import { signOut } from '../Auth';
import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  H1,
  Image,
} from "native-base";

import { StackNavigator } from "react-navigation";
import { connect } from 'react-redux';
class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.signOut = this.signOut.bind(this);
  }
  signOut() {
    signOut().then(res => {
      this.props.navigation.navigate('SignedOut');
    })
  }
  render() {
    var usersList = this.props.users;
    const userId = this.props.navigation.state.params.user;
    var user = usersList.find(i => i.Id == userId)
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem cardBody>
              <H1> Profile Details</H1>
            </CardItem>
            <CardItem>
              <Icon name="person" />
              <Text>{user.name}</Text>
            </CardItem><CardItem>
              <Icon name="email" />
              <Text>{user.email}</Text>
            </CardItem>
          </Card>

          <Button rounded full onPress={this.signOut} ><Text>Signout</Text></Button>
        </Content>
      </Container>
    );
  }
}
//this is used to get data from other components
const mapStateToProps = (state) => {

  return state
}
export default connect(mapStateToProps, {})(UserProfile)
UserProfile.navigationOptions = ({ navigation }) => {
  return {
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate("Users")}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Profile</Title>
        </Body>
        <Right />
      </Header>
    )
  };
};