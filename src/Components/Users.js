import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StyleProvider, Container, H1, Card, List, ListItem, Title, Content, Button, CardItem, Header, Left, Right, Body, Icon} from 'native-base';
import expo, {AppLoading} from 'expo';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import {connect} from 'react-redux';
import { getUsers } from "../APIActions/Users/UsersApiActions";

 class Users extends Component {
  // constructor(props){
  //   super(props);
  //   this.getUsers = this.getUsers.bind(this);
  // }
  
  componentDidMount(){
    // this.setState({loading:true})
    this.props.getUsers();
  }
  componentWillUnmount(){
    this.props.userList = [];
    this.props.loading = true;
    this.props.error = false;
  }
 render(){
  //  var items = [
  //    'Simon Mignolet',
  //    'Nathaniel Clyne',
  //    'Dejan Lovren',
  //    'Mama Sakho',
  //    'Emre Can'
  //  ];
   var items = this.props.usersList;
   var usersError = this.props.error;
   if (this.props.loading) {
    return (<View style={{flex:1, justifyContent:"center",alignItems:"center" }}><Text >Loading...</Text></View>)
   }
  //  var userList = this.props.users.map((item, index) => {
  //    return (<li key={index}>{item.name}</li>)
  //  })
   return(
        
       <Container>
         <Content padder>
          <Card center>
            <CardItem>
              
             <List dataArray={items}
               renderRow={(item) =>
                 <ListItem>
                   <Body><Text>{item.name}</Text></Body>
                   <Right>
                     <Button transparent onPress={() => this.props.navigation.navigate('UserProfile', { username: item.username})}>
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
const mapStateToProps = (state, props) =>{
 var {users} = state; 
  return { loading, usersList, error } = users
  
}

export default connect(mapStateToProps, {getUsers})(Users)
Users.navigationOptions = ({ navigation }) => {
  return {
    header: (
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
          <Title>Quotes</Title>
        </Body>
        <Right />
      </Header>
    )
  };
};