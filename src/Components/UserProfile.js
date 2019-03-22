import React from "react";
import { AppRegistry, Alert, Image, View, TouchableHighlight, Modal, LayoutAnimation} from "react-native";
import {signOut} from '../Auth';
import { getUserInfo } from "../APIActions/Users/UsersApiActions";
import { Col, Row, Grid, } from "react-native-easy-grid";

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
 
} from "native-base";

import { StackNavigator } from "react-navigation";
import { connect } from 'react-redux';
 class UserProfile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false
    }
    this.signOut = this.signOut.bind(this);
    this.toggleModal = this.toggleModal.bind(this)
  }
  componentDidMount(){

    this.props.getUserInfo(this.props.navigation.state.params.username);
  }
   componentWillUnmount() {
     this.props.userInfo = {};
     this.props.loading = true;
     this.props.error = false;
   }
   toggleModal(val) {
    this.setState({modalVisible: val});
   }
  signOut () {
    signOut().then(res =>{
      this.props.navigation.navigate('SignedOut');
    })
  }
  render() {
    // var usersList = this.props.users;
    // const userId = this.props.navigation.state.params.user;
    var user =this.props.userInfo
    if (this.props.loading) {
      return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text >Loading...</Text></View>)
    }
    return (
      <Container>
        <Content padder>
          
          <Card style={{ flex: 1, zIndex: 1, backgroundColor: 'black', justifyContent: "center", alignItems: "center"}}>
           
            <Text style={{color:'white', fontSize: 40, paddingTop:25, paddingBottom:25 }}>{user.username}</Text>

            <Image style={{ height: 100, width: 100, paddingTop: 25, resizeMode: 'cover', borderRadius:50, borderColor:'white' }} source={{ uri: user.profile_image.large }} />

            <Text style={{ color: 'white', fontSize: 24, paddingBottom: 25 }}>{(user.bio ? user.bio: 'The user does not have any bio. Get to know more about the user from the photos he likes and shares')}</Text>
            <CardItem style={{ paddingTop: 25, paddingBottom: 25 }}>
              <Left>
                <View>
                  <Text style={{ textAlign: 'center' }}>{user.total_likes}</Text>
                  <Text>Likes</Text>
                </View>
              </Left>
              <Body>
                 <View> 
                  <Text style={{ textAlign: 'center' }}>{user.total_photos}</Text>
                  <Text>Photos</Text>
                 </View>
              </Body>
              <Right>
                <View> 
                  <Text style={{ textAlign: 'center' }}>{user.total_collections}</Text>
                  <Text>Collections</Text>
                </View>
              </Right>  
            </CardItem>
            <CardItem style={{ paddingTop: 25, paddingBottom: 25 }}>
              <Left>
                <View> 
                  <Text style={{ textAlign: 'center'}}>{user.downloads}</Text>
                  <Text>Downloads</Text>
                </View>
              </Left>
              <Body>
                <TouchableHighlight onPress={() => {this.toggleModal(true)}}>
                <View>
                  <Text style={{ textAlign: 'center' }}>{user.followers_count}</Text>
                  <Text>Followers</Text>
                </View>
                </TouchableHighlight>
              </Body>
              <Right>
                <View>
                  <Text style={{ textAlign: 'center' }}>{user.following_count}</Text>
                  <Text>Following</Text>
                </View>
              </Right>
            /</CardItem>

          </Card>
          <Button rounded full onPress={this.signOut} ><Text>Signout</Text></Button>
        </Content>

        <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
               <Container style={{flex: 1, paddingTop:100}}>
               <Grid>
                  <Text>Modal is open!</Text>
              <Text>{user.followers_count}</Text>
                  <TouchableHighlight onPress = {() => {
                     this.toggleModal(!this.state.modalVisible)}}>
                     
                     <Text>Close Modal</Text>
                  </TouchableHighlight>
              </Grid>
               </Container>
            </Modal>
      </Container>
    );
  }
}
//this is used to get data from other components
const mapStateToProps = (state) => {
  var { user } = state;
  var { loading, userInfo, error } = user
  //alert(users);
  return { loading, userInfo, error }

}
export default connect(mapStateToProps, {getUserInfo})(UserProfile)
UserProfile.navigationOptions = ({ navigation }) => {
  return {
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate("Home")}>
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