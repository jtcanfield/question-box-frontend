const DATA_RECIEVED = 'DATA_RECIEVED';

export function loaddata(data) {
  console.log(data);
  return {
    type: DATA_RECIEVED,
    payload: data
  };
};
