/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

const makeSelectAllLots = () => createSelector(
  selectHome,
  (homeState) => homeState.get('allLots')
);

export {
  selectHome,
  makeSelectUsername,
  makeSelectAllLots
};
