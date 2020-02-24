import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import './app.scss';
import ColorTool from '../colorTool/ColorTool';
import { ToastContainer, toast } from 'react-toastify';
import ContrastChecker from '../contrastCompare/ContrastCompare';
import { CSSTransition } from 'react-transition-group';
import Header from '../header/Header';
import ColorBlender from '../colorBlender/ColorBlender';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

interface AppProps {
	history: History;
}

const routes = [
	{ path: '/contrast', name: '/contrast', Component: ContrastChecker },
	{ path: '/color-tool', name: '/color-tool', Component: ColorTool },
	{ path: '/blender', name: '/blender', Component: ColorBlender }
];

const App = ({ history }: AppProps) => {
	return (
		<ConnectedRouter history={history}>
			<div className="app">
				<Header />
				<Route exact path="/">
					<Redirect to="/color-tool" />
				</Route>
				{routes.map(({ path, Component }: any) => (
					<Route key={path} path={path}>
						{({ match }) => (
							<CSSTransition in={match != null} timeout={250} classNames="fade" unmountOnExit>
								<Component />
							</CSSTransition>
						)}
					</Route>
				))}
				<ToastContainer hideProgressBar={true} enableMultiContainer containerId="toasts-container" position={toast.POSITION.TOP_RIGHT} />
			</div>
		</ConnectedRouter>
	);
};

export default App;
