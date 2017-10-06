const reducer = function (state, action) {
  if(action.type === 'DATA_RECIEVED'){
    return Object.assign({}, state, {activeUser: action.payload});
  }
  if(action.type === 'SET_TOKEN'){
    return Object.assign({}, state, {username: action.payload});
  }
  return state;
}

export default reducer;
