import { combineReducers } from "redux";
import users from './UsersReducer';
import albums from './AlbumsReducers';
import album from './AlbumReducer';
import user from './UserReducer';
import randomQuotes from './RandomQuotesReducer';
export default   combineReducers({
  users, 
  albums,
  album,
  user,
  randomQuotes
});