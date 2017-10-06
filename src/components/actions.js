import request from 'superagent';
import cookies from 'react-cookies';
const DATA_RECIEVED = 'DATA_RECIEVED';

export function loaddata(data) {
  return {
    type: DATA_RECIEVED,
    payload: data
  };
};


export const SET_TOKEN = 'SET_TOKEN';
const makeActionCreator = function(actionType) {
  return function(payload) {
    return {type: actionType, payload: payload}
  }
}
const setToken = makeActionCreator(SET_TOKEN);


export const checklogin = (data) => {
  return (dispatch) => {
    request
      .post(`http://localhost:5000/checklogin`)
      .set('Authorization', cookies.load("Token"))
      .end((err, res) => {
          dispatch(setToken(res.body));
      })
  }
}
