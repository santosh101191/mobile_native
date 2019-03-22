import Unsplash from 'unsplash-js/native';

const unsplash = new Unsplash({
  applicationId: "f31209e0f2b69d1fbd69d7a0cbdbc74c46174ee2cf8e09c3a3428ad1944a35bd",
  secret: "4c5fba047a1fac64a3c7b73d45cdc9d4ca73adef2e4e1239491a089aa0c26c47",
  callbackUrl: ""
});
export const getRandomQuotes = () => {
  return function (dispatch) {
    fetch(`https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`)
      .then(response =>
        response.json())
      .then((data) => {
        dispatch({ type: 'GET_QUOTES_RECEIVED', data });
        return data
      })
      .catch((error) => {
        dispatch({ type: 'GET_QUOTES_ERROR', error });
        return error
      });
  }
}
