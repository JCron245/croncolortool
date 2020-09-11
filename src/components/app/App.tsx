import React, { ReactElement, FC, useState, useEffect, Suspense, lazy } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import './app.scss';
import { ToastContainer, toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import { Header } from '../header/Header';
import { Helmet } from 'react-helmet';

const ColorTool = lazy(() => import('../colorTool/ColorTool').then((module) => ({ default: module.ColorTool })));
const ContrastChecker = lazy(() => import('../contrastCompare/ContrastCompare').then((module) => ({ default: module.ContrastChecker })));
const ColorBlender = lazy(() => import('../colorBlender/ColorBlender').then((module) => ({ default: module.ColorBlender })));

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

export const App = (): ReactElement => {
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
