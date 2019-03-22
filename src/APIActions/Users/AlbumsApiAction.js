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

export const getAlbums = () => {
  return function (dispatch) {
    fetch(`https://api.unsplash.com/collections/?client_id=b6c206e8b5729dcb4b2d4cd043760413daa18beb3ad378abe4c631a5650f96f9&query=london`)
      .then(response =>
        response.json())
      .then((data) => {
        dispatch({ type: 'GET_ALBUMS_RECEIVED', data });
      })
      .catch((error) => {
        dispatch({ type: 'GET_ALBUMS_ERROR', error });
      });
  }
}

export const getAlbum = (collectionId) => {
  const url = `https://api.unsplash.com/collections/${collectionId}/photos?client_id=b6c206e8b5729dcb4b2d4cd043760413daa18beb3ad378abe4c631a5650f96f9&query=london`
  return function (dispatch) {
    fetch(url)
      .then(response =>
        response.json())
      .then((data) => {
        dispatch({ type: 'GET_ALBUM_RECEIVED', data });
      })
      .catch((error) => {
        dispatch({ type: 'GET_ALBUM_ERROR', error });
      });
  }
}
// export default AlbumsServices = {
//   getAlbum,
//   getAlbums
// }