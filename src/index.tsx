import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './components/app/App';
import { Provider } from 'react-redux';
import { configureStore, history } from './configureStore';
import { ConnectedRouter } from 'connected-react-router';

console.log('If you like this, check out my resume! https://joncornwell.com');

const store = configureStore();

const render = () => {
	ReactDOM.render(
		<StrictMode>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<App />
					fart
				</ConnectedRouter>
			</Provider>
		</StrictMode>,
		document.getElementById('root')
	);
};

render();

// Hot reloading
if (module.hot) {
	// Reload components
	module.hot.accept('./components/app/App', () => {
		render();
	});
}
