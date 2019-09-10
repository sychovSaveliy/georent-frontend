/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { SET_ALL_LOTS } from './constants';

// The initial state of the App
const initialState = fromJS({
  allLots: ['test']
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_LOTS:
      return state.set('allLots', action.payload);
    default:
      return state;
  }
}

export default homeReducer;
