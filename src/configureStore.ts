import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createRootReducer } from './redux/reducers/rootReducer';

export const history = createBrowserHistory();

export function configureStore() {
	const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(createRootReducer(history), undefined, composeEnhancer(applyMiddleware(routerMiddleware(history))));

	// Hot reloading
	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./redux/reducers/rootReducer', () => {
			store.replaceReducer(createRootReducer(history));
		});
	}

	return store;
}
