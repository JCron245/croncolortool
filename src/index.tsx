import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import configureStore, { history } from './configureStore';

const store = configureStore();

console.log('If you like this, check out my resume! https://joncornwell.com');

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<App history={history} />
		</Provider>,
		document.getElementById('root')
	);
};

render();

// Init Google Analytics
ReactGA.initialize('');

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

// Hot reloading
if (module.hot) {
	// Reload components
	module.hot.accept('./components/app/App', () => {
		render();
	});
}
