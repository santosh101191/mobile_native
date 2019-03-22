import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StyleProvider, Container, H1, Card, List, ListItem, Title, Content, Button, CardItem, Header, Left, Right, Body, Icon } from 'native-base';
import expo, { AppLoading } from 'expo';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { connect } from 'react-redux';

class Home extends Component {
  // constructor(props){
  //   super(props);
  //   this.getUsers = this.getUsers.bind(this);
  // }

  componentDidMount() {
    // this.setState({loading:true})
  }
  render() {
     var items = [
      {name:'Users', route: 'Users'},
       { name:'Albums', route: 'Albums'},
       { name: 'Quotes', route:   'RandomQuotes'} ];
    if (this.props.loading) {
      return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text >Loading...</Text></View>)
    }
    //  var userList = this.props.users.map((item, index) => {
    //    return (<li key={index}>{item.name}</li>)
    //  })
    return (

      <Container>
        <Content padder>
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("SideBar")}
              >
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>Home</Title>
            </Body>
            <Right />
          </Header>
          <Card center>
            <CardItem>
              <H1> Users List</H1>
            </CardItem>
            <CardItem>

              <List dataArray={items}
                renderRow={(item) =>
                  <ListItem>
                    <Body><Text>{item.name}</Text></Body>
                    <Right>
                      <Button transparent onPress={() => this.props.navigation.navigate(item.route)}>
                        <Text>View</Text>
                      </Button>
                    </Right>
                  </ListItem>
                }>
              </List>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
export default (Home)
Home.navigationOptions = {
  header: null
};