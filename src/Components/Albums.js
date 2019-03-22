import React, { Component,   } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { StyleProvider, Container, H1, Card, List, ListItem, Title, Content, Button, CardItem, Header, Left, Right, Body, Icon, DeckSwiper } from 'native-base';
import expo, { AppLoading } from 'expo';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
// import { AlbumsServices}  from "./APIActions/Users/AlbumsApiAction"; 
import { getAlbums } from "../APIActions/Users/AlbumsApiAction";
import { connect } from 'react-redux';
// const getAlbums = AlbumsServices.getAlbums;
// const getAlbum = AlbumsServices.getAlbum;

class Albums extends Component {
  constructor(props){
    super(props);
    this.goToAlbum - this.goToAlbum.bind(this);
  }

  componentWillMount() {
    // this.setState({loading:true})
    this.props.getAlbums();
  }
  goToAlbum () {
    //this.props.navigation.navigate('Album', { albumId: id })
  }
  render() {
    var items = this.props.albumsList;
    if (this.props.loading) {
      return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text >Loading...</Text></View>)
    }
    //  var userList = this.props.users.map((item, index) => {
    //    return (<li key={index}>{item.name}</li>)
    //  })
    return (

      <Container>
        <Content padder>

          <List center dataArray={items}
            renderRow={(item) => 
              <Card padder>
              <View>
                <CardItem>
                    <Button transparent onPress={() => this.props.navigation.navigate('Album', { albumId: item.id })}>
                      <Text>View</Text>
                    </Button>
                </CardItem>
                <CardItem>
                    <Title>{item.title}</Title>   
                </CardItem>
                </View> 
              <View>

                <CardItem padder style={{ zIndex: 1,alignItems:'center', marginRight:5 }}>
                  <DeckSwiper
                    dataSource={item.preview_photos}
                    renderItem={photo =>
                      <Card style={{ elevation: 3 }}>
                        <CardItem cardBody>
                          <Image style={{ height: 200, width: 320 }} source={{ uri: photo.urls.thumb }} /> 
                        </CardItem>
            
                        
                      </Card>
                    }
                    
                  />
                
              </CardItem>
                </View>
              <CardItem style={{paddingTop:220}}>
                  <Text>{item.description}</Text>
              </CardItem>
                <CardItem><Text>Total Photos:{item.total_photos}</Text></CardItem>
                
            </Card>
          }>
          </List>
        </Content>
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  var {albums} = state;
  var { loading, albumsList, error } = albums
  //alert(users);
  return { loading, albumsList, error }

}

export default connect(mapStateToProps, {getAlbums})(Albums)
Albums.navigationOptions = {
  header: (<Header>
    <Left>
      <Button
        transparent
        onPress={() => this.props.navigation.navigate("SideBar")}
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