import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { colorReducer } from './colorReducer';
import { contrastReducer } from './contrastReducer';

export const createRootReducer = (history: History) =>
	combineReducers({
		color: colorReducer,
		contrast: contrastReducer,
		router: connectRouter(history),
	});
