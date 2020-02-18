import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import './app.scss';
import ColorTool from '../color-tool/color-tool';
import { ToastContainer, toast } from 'react-toastify';
import ContrastChecker from '../contrast-checker/contrast-checker';
import { CSSTransition } from 'react-transition-group';
import { Navigation } from './navigation/navigation';
import ColorBlender from '../color-blender/color-blender';
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
				<Navigation />
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
