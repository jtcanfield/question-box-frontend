import request from 'superagent';
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
            .set('Authorization', data)
            .end((err, res) => {
                dispatch(setToken(res.body));
            })
    }
}
//  function checklogin(data) {
//   request
//     .post(`http://localhost:5000/checklogin`)
//     .set('Authorization', data)
//     .then((err,res)=>{
//       if (res !== undefined){
//         if (res.status !== 200 && res.statusCode !== 200){
//           data = null;
//         } else if (res.status === 200 && res.statusCode === 200){
//           data = res.body;
//           console.log("WE HAVE A BODY");
//         }
//       } else {
//         data = null;
//       }
//     })
//   return {
//     type: CHECK_LOGIN,
//     payload: data
//   };
// };
