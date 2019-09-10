import {SET_ALL_LOTS} from '../actions/ActionTypes';

const lotsReducer = (lotsState = [], action) => {
  switch (action.type) {
    case SET_ALL_LOTS:
      return action.payload;
    default:
      return lotsState;
  }
};

export default lotsReducer;
