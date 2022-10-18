const initialState = {
  authToken: null,
  authUserId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state, //copy all previous states
        authToken: action.payloadToken,
        authUserId: action.payloadUserId,
        authSubServer: action.payloadSubServer,
        authCorporate: action.payloadCorporate,
        authCookie: action.payloadCookie,
      };
    case 'LOGOUT':
      return {
        authToken: null,
        authUserId: null,
        authSubServer: action.payloadSubServer,
        authCorporate: action.payloadCorporate,
        authCookie: action.payloadCookie,
      };
    default:
      return state;
  }
};
