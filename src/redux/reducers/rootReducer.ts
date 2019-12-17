import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import colorReducer from './colorReducer';

const createRootReducer = (history: History) =>
	combineReducers({
		color: colorReducer,
		router: connectRouter(history)
	});

export default createRootReducer;
