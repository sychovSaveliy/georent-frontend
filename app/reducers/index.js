import { combineReducers } from 'redux'
import lotsReducer from '../reducers/lots'

export default combineReducers({
	lots: lotsReducer
})
