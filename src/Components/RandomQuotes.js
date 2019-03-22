import React from "react";
import { StyleSheet, View, Image, ActivityIndicator, TouchableOpacity, CameraRoll, WebView, Dimensions} from 'react-native';
import { getRandomQuotes } from '../APIActions/Users/RandomQuotesApiAction';
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
  ListItem,
  H1,
} from "native-base";

import { StackNavigator } from "react-navigation";
import { connect } from 'react-redux';
import { Col, Row, Grid, } from "react-native-easy-grid";

const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
const tumblrUrl = (currentQuote, currentAuthor) =>{
  currentAuthor = encodeURIComponent(currentAuthor)
  currentQuote = encodeURIComponent(currentQuote)
  return `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${currentAuthor}&content=${currentQuote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`
}
const twitterUrl = (currentQuote, currentAuthor) =>{
  currentAuthor = encodeURIComponent(currentAuthor)
  currentQuote = encodeURIComponent(currentQuote)
  var text = encodeURIComponent(currentQuote + currentAuthor);
  return `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${text}`
}
class RandomQuotes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: null,
      author: null,
      backgroundColor: colors[0],
    openTumblrPage: false
    }
    this.getQuote = this.getQuote.bind(this);
  }
  componentDidMount() {
    this.props.loading = true;
    this.props.getRandomQuotes(res =>{
      this.getQuote()
    });
  }
  componentWilReceiveProps() {
    this.getQuote()
  }
  componentWillUnmount(){
    this.props.loading = true;
  }
  getQuote(){
    var quotesList = this.props.quotesList;
    var randomColor = Math.floor(Math.random() * colors.length)
    var randomQuote = Math.floor(Math.random() * quotesList.length)
   
    this.setState({ quote: quotesList[randomQuote].quote, author: quotesList[randomQuote].author, backgroundColor: colors[randomColor]})
  }
  onNavigationStateChange() {
    this.props.navigation.navigate("RandomQuotes")
  }
  render(){
    var dimensions = Dimensions.get('window')
    var {height, width} = dimensions;
    var quotesList = this.props.quotesList
    if(this.props.loading ){
     return(
      <View style={styles.container}>
          <ActivityIndicator
            animating={this.props.loading}
            color='#bc2b78'
            size="large"
            style={styles.activityIndicator} />
        </View>
     ) 
    }
    if(!this.state.quote && !this.props.loading ){
      this.getQuote();
    }
    return(
      <Container>
        {/* <Content padder>
                <List dataArray= {quotesList}
                renderRow={(item) =>
                  <ListItem>
                    <Card>
                      <CardItem>
                        <View>
                          <Text> Author: {item.author} </Text>
                          <Text>Quote: {item.quote}</Text>
                        </View>
                       
                      </CardItem>
                    </Card>
                  </ListItem>}>
              </List>
           
        </Content> */}
        
        {this.state.webViewOpen ? '' : 
        <Content style = {{backgroundColor:this.state.backgroundColor, flex: 2}}>
           
            <Card>
                <CardItem>
                  <Grid>
                    <Row>
                    {/* <Col size={1}>
                       
                      </Col> */}
                    <Col size={3}>
                      <View>
                        <H1>
                          {this.state.quote}
                        </H1>
                        </View><Icon name="quote" />
                        
                      </Col>
                      
                    </Row>
                    </Grid>
                    </CardItem>
                    <CardItem>
                     <Grid>
                    <Row>
                    <Col size={1}>
                      <Icon name="logo-tumblr" onPress = {() => this.setState({openTumblrPage:true, webViewOpen: true})}/>
                      </Col>
                    <Col size={1}>
                      <Icon name="logo-twitter"/>
                      </Col>
                    <Col size={2}>
                      <Button style={{ backgroundColor: this.state.backgroundColor }} rounded full onPress={this.getQuote} ><Text>Next</Text></Button>
      
                      </Col>
                    </Row>
                  </Grid>
                
                  </CardItem>
                
                </Card>
                
           
        </Content>}
       
          {this.state.openTumblrPage ?
            <View style={{height:height }}>
            <WebView source={{ uri: `https://www.tumblr.com` }} scrollEnabled={true} startInLoadingState={true} goBack=
              {this.onNavigationStateChange.bind(this)}/>
            </View> : ''}
        
      </Container>
    )
  }
}
const mapStateToProps = (state) =>{
  var { randomQuotes } = state;
  var { loading, quotesList, error } = randomQuotes
  //alert(users);
  return { loading, quotesList, error }
}
export default connect(mapStateToProps, { getRandomQuotes })(RandomQuotes)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
});  
RandomQuotes.navigationOptions = ({ navigation }) => {
  return {
    header: (
      <Container>

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
            <Title>Random</Title>
          </Body>
          <Right />
        </Header>
      </Container>
    )
  };
};