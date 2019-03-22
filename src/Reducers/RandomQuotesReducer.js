var intialState = { quotesList: [], loading: true, error: false }
export default (state = intialState, action) => {
  switch (action.type) {
    case 'GET_QUOTES':
      return {
        ...state,
        loading: false,
        quotesList: action.quotesList,
      };
    case 'GET_QUOTES_LOADING':
      return {
        ...state,                   // keep the existing state,
        loading: true,              // but change loading to true
      };
    case 'GET_QUOTES_RECEIVED':
      //alert(JSON.stringify(action.data))
      return {
        ...state,
        loading: false,
        quotesList: action.data.quotes,
      };
    case 'GET_QUOTES_ERROR':
      return {
        ...state,
        loading: false,
        error

      };
    default:
      return state;
  }
};
