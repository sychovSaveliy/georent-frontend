import {FETCH_LOTS} from '../actions/ActionTypes';

const lotsReducer = (lotsState = [], action) => {
  switch (action.type) {
    case FETCH_LOTS:
      return action.payload;
    default:
      return lotsState;
  }
};

export default lotsReducer;
