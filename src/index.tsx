import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app/app';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { colorReducer } from './redux/reducers/colorReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReactGA from 'react-ga';

const store = createStore(colorReducer, composeWithDevTools());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

ReactGA.initialize('UA-139332644-1');

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
