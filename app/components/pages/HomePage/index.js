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
} from '../../../App/selectors';
import { loadRepos } from '../../../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

import styles from './styles.scss';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
  onSubmitForm: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadRepos());
  }
});

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError()
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
