var intialState = { albumsList: [], loading: true, error: false }
export default (state = intialState, action) => {
  switch (action.type) {
    case 'GET_ALBUMS':
      // Dispatch GET_MOVIE_DATA_LOADING to update loading state
      //store.dispatch({ type: 'GET_USERS_LOADING' });
      // Make API call and dispatch appropriate actions when done
      return {
        ...state,
        loading: false,             // set loading to false
        albumsList: action.albums, // update users array with reponse data
      };
    case 'GET_ALBUMS_LOADING':
      return {
        ...state,                   // keep the existing state,
        loading: true,              // but change loading to true
      };
    case 'GET_ALBUMS_RECEIVED':
      //alert(JSON.stringify(action.data))
      return {
        ...state, 
        loading: false,             // set loading to false
        albumsList: action.data, // update users array with reponse data
      };
    case 'GET_ALBUMS_ERROR':
      return {
        ...state,
        loading: false,
        error

      };
    default:
      return state;
  }
};
