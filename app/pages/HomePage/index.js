import { connect } from 'react-redux';

import { withStyles } from 'utils/styling';
import styles from './styles.scss';
import HomePage from './HomePage';
import {setAllLots} from '../../actions';

const mapStateToProps = (state) => ({
  allLots: state.allLots
});

const mapDispatchToProps = {
  setAllLots
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomePage));
