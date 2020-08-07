import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore, { history } from './configureStore';
import { ConnectedRouter } from 'connected-react-router';

const store = configureStore();

const render = () => {
	ReactDOM.render(
		<React.StrictMode>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<App />
				</ConnectedRouter>
			</Provider>
		</React.StrictMode>,
		document.getElementById('root')
	);
};

render();

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

// Hot reloading
if (module.hot) {
	// Reload components
	module.hot.accept('./components/app/App', () => {
		render();
	});
}
