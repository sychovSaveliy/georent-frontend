import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'utils/styling';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError
} from 'App/selectors';
import { loadRepos } from 'App/actions';
import { setAllLots } from './actions';
import { makeSelectAllLots } from './selectors';
import reducer from './reducer';
import saga from './saga';

import styles from './styles.scss';
import HomePage from './HomePage';

const mapDispatchToProps = {
  setAllLots
};

const mapStateToProps = createStructuredSelector({
  allLots: makeSelectAllLots()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles)
)(HomePage);

export { mapDispatchToProps };
