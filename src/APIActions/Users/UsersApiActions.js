import Unsplash from 'unsplash-js/native';
const unsplash = new Unsplash({
  applicationId: "f31209e0f2b69d1fbd69d7a0cbdbc74c46174ee2cf8e09c3a3428ad1944a35bd",
  secret: "4c5fba047a1fac64a3c7b73d45cdc9d4ca73adef2e4e1239491a089aa0c26c47",
  callbackUrl: ""
});
const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_user",
  "read_photos",
  "write_photos"
]);


export const getUsers = () => {
  return function(dispatch) {
    fetch(`https://api.unsplash.com/search/users?client_id=b6c206e8b5729dcb4b2d4cd043760413daa18beb3ad378abe4c631a5650f96f9&query="jeff"`)
      .then(response =>
        response.json())
      .then((data) => {
        var usersjson = {
          data: require('../../JSONFILES/users')
        }
        dispatch({ type: 'GET_USERS_RECEIVED', data });
      })
      .catch((error) => {
        dispatch({ type: 'GET_USERS_ERROR', error });
      });
  }
}

export const getUserInfo = (username) => {
  const url = `https://unsplash.com/napi/users/${username}?client_id=b6c206e8b5729dcb4b2d4cd043760413daa18beb3ad378abe4c631a5650f96f9`
  return function (dispatch) {
    fetch(url)
      .then(response =>
        response.json())
      .then((data) => {
        dispatch({ type: 'GET_USERINFO_RECEIVED', data });
      })
      .catch((error) => {
        dispatch({ type: 'GET_USERINFO_ERROR', error });
      });
  }
}