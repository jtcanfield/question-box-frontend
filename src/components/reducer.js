const reducer = function (state, action) {
  console.log(state);
  console.log(action);
  if(action.type === 'DATA_RECIEVED'){
    return Object.assign({}, state, {activeUser: action.payload});
  }
  return state;
}

export default reducer;
