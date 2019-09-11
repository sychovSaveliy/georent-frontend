import {FETCH_LOTS} from './ActionTypes';

const fetchLots = (lots) => (
		{
			type: FETCH_LOTS,
			payload: lots
		}
	);

export {
  fetchLots,
};
