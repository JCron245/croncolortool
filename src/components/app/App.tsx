import React, { ReactElement, FC, useState, useEffect, Suspense, lazy } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import './app.scss';
import { ToastContainer, toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import { Header } from '../header/Header';
import { Helmet } from 'react-helmet';
import { initialize as ReactGAInit } from 'react-ga';

const ColorTool = lazy(() => import('../colorTool/ColorTool'));
const ContrastChecker = lazy(() => import('../contrastCompare/ContrastCompare'));
const ColorBlender = lazy(() => import('../colorBlender/ColorBlender'));

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
	ReactGAInit('');
	console.log('If you like this, check out my resume! https://joncornwell.com');
} else {
	console.log('[DEV MODE]');
}

interface AppRoute {
	path: string;
	name: string;
	Component: FC;
}

const appRoutes = [
	{ path: '/color-tool', name: '/color-tool', Component: ColorTool },
	{ path: '/contrast', name: '/contrast', Component: ContrastChecker },
	{ path: '/blender', name: '/blender', Component: ColorBlender },
];

const Routes = (): ReactElement => {
	const routeList = appRoutes.map(
		({ path, Component }: AppRoute): ReactElement => (
			<Route exact={true} key={path} path={path}>
				{({ match }) => (
					<CSSTransition in={match != null} timeout={200} classNames="fade" unmountOnExit>
						<Component />
					</CSSTransition>
				)}
			</Route>
		)
	);

	routeList.push(
		<Route key={'home'} exact path="/">
			<Redirect to="/color-tool" />
		</Route>
	);

	return <>{routeList}</>;
};

const App = (): ReactElement => {
	const location = useLocation();
	const [title, setTitle] = useState<string>();

	useEffect(() => {
		setTitle(location.pathname === '/color-tool' ? 'Color Manipulation Tool' : 'Contrast Checker Tool');
	}, [location]);

	return (
		<div className="app">
			<Helmet title={title} />
			<Header />
			<Suspense fallback={<div>Loading...</div>}>
				<Routes />
			</Suspense>
			<ToastContainer hideProgressBar={true} enableMultiContainer containerId="toasts-container" position={toast.POSITION.TOP_RIGHT} />
		</div>
	);
};

export default App;
