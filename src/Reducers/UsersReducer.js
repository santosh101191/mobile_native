
export default (state = { usersList: [], loading: true, error: false }, action) => {
  switch (action.type) {
    case 'GET_USERS':
      // Dispatch GET_MOVIE_DATA_LOADING to update loading state
      //store.dispatch({ type: 'GET_USERS_LOADING' });
      // Make API call and dispatch appropriate actions when done
        return {
          loading: false,           // set loading to false
          usersList: action.users, // update users array with reponse data
        };
    case 'GET_USERS_LOADING':
      return {
        ...state,                   // keep the existing state,
        loading: true,              // but change loading to true
      };
    case 'GET_USERS_RECEIVED':
      //alert(JSON.stringify(action.data))
      return {
        ...state,
        loading: false,             // set loading to false
        usersList: action.data.results, // update users array with reponse data
      };
    case 'GET_USERS_ERROR':
      return {
        ...state,
        loading: false,
        error

      };
    default:
      return state;
  }
};
