import { ReactElement, FC, lazy } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const ColorTool = lazy(() => import('../colorTool/ColorTool').then((module) => ({ default: module.ColorTool })));
const ContrastChecker = lazy(() => import('../contrastCompare/ContrastCompare').then((module) => ({ default: module.ContrastChecker })));
const ColorBlender = lazy(() => import('../colorBlender/ColorBlender').then((module) => ({ default: module.ColorBlender })));
const ColorRandom = lazy(() => import('../colorRandom/ColorRandom').then((module) => ({ default: module.RandomColor })));
const Palette = lazy(() => import('../colorPalette/ColorPalette').then((module) => ({ default: module.Palette })));
const About = lazy(() => import('../about/About').then((module) => ({ default: module.About })));

interface AppRoute {
	path: string;
	name: string;
	Component: FC;
}

const appRoutes = [
	{ path: '/blender', name: '/blender', Component: ColorBlender },
	{ path: '/color-tool', name: '/color-tool', Component: ColorTool },
	{ path: '/contrast', name: '/contrast', Component: ContrastChecker },
	{ path: '/random', name: '/random', Component: ColorRandom },
	{ path: '/palette', name: '/palette', Component: Palette },
	{ path: '/about', name: '/about', Component: About },
];

export const Routes = (): ReactElement => {
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
		<Route key="home" exact path="/">
			<Redirect to="/color-tool" />
		</Route>
	);

	return <>{routeList}</>;
};
