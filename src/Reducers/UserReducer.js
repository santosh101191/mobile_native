var intialState = { userInfo: {}, loading: true, error: false }
export default (state = intialState, action) => {
  switch (action.type) {
    case 'GET_USERINFO':
      return {
        ...state,
        loading: false,            
        userInfo: action.userInfo, 
      };
    case 'GET_USERINFO_LOADING':
      return {
        ...state,                   // keep the existing state,
        loading: true,              // but change loading to true
      };
    case 'GET_USERINFO_RECEIVED':
      //alert(JSON.stringify(action.data))
      return {
        ...state,
        loading: false,
        userInfo: action.data,
      };
    case 'GET_USERINFO_ERROR':
      return {
        ...state,
        loading: false,
        error

      };
    default:
      return state;
  }
};
