import React from "react";
import { StyleSheet,  View, Image, TouchableOpacity , CameraRoll, Dimensions } from 'react-native';
import { signOut } from '../Auth';
import { getAlbum } from '../APIActions/Users/AlbumsApiAction';
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
  List,
  H1,
} from "native-base";

import { StackNavigator } from "react-navigation";
import { connect } from 'react-redux';



class Album extends React.Component {
  constructor(props) {
    super(props)
    this.signOut = this.signOut.bind(this);
    this.downloadImage = this.signOut.bind(this);

  }
  componentDidMount() {
    this.props.getAlbum(this.props.navigation.state.params.albumId)
  }
  
  downloadImage (id) {

  }
  signOut() {
    signOut().then(res => {
      this.props.navigation.navigate('SignedOut');
    })
  }
  render() {
    var items = this.props.albumList;
    var dimensions = Dimensions.get('window')
    var { height, width } = dimensions;
    if (this.props.loading) {
      return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text >Loading...</Text></View>)
    }
    return (
      <Container>
        <Content padder>
          <List center dataArray={items}
            renderRow={(item) =>
              <View>
              <Card style={{margin: 25}} >
                  <CardItem>
                    <Title>{item.description}</Title>
                  </CardItem>
                  <View>
                      {/* <CardItem style={{ height: height / 2, width: width, margin: 5 }}> */}
                      <TouchableOpacity onLongPress={() => CameraRoll.saveToCameraRoll(`unsplash ${item.id}` )}>
                        <Image style={{ height: height/2,  margin:5, resizeMode:'cover' }} source={{ uri: item.urls.thumb }} />
                      </TouchableOpacity>
                  {/* </CardItem> */}
                  </View>

                  <CardItem>
                    <Text>{item.user.description}</Text>
                  </CardItem>
                  <CardItem>
                    <Text>Location : {(item.user.location? item.user.location : 'NA')}</Text>
                  </CardItem>
                  <CardItem>
                    <Icon name="heart" style={{ color: '#ED4A6A' }} />
                    <Text>{item.likes}</Text>
                  </CardItem>
              </Card>
               </View>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}
//this is used to get data from other components
const mapStateToProps = (state) => {
  var { album } = state;
  var { loading, albumList, error } = album
  //alert(users);
  return { loading, albumList, error }

}

export default connect(mapStateToProps, { getAlbum })(Album)
Album.navigationOptions = {
  header: (<Header>
    <Left>
      <Button
        transparent
        onPress={() => this.props.navigation.navigate("Albums")}
      >
        <Icon name="menu" />
      </Button>
    </Left>
    <Body>
      <Title>Albums</Title>
    </Body>
    <Right />
  </Header>)
};