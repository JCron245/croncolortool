import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './app.scss';
import ExtendedSwatch from '../color-tool/color-tool';
import { ToastContainer, toast } from 'react-toastify';
import ContrastChecker from '../contrast-checker/contrast-checker';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Navigation } from './navigation/navigation';
import ColorBlender from '../color-blender/color-blender';

const App = () => {
	return (
		<Router>
			<Navigation />
			<Route
				render={({ location }) => (
					<TransitionGroup className="app" component={'main'}>
						<CSSTransition in={true} timeout={250} classNames="fade" appear={true} key={location.key}>
							<Switch>
								<Route path="/contrast" component={ContrastChecker} />
								<Route path="/color-tool" component={ExtendedSwatch} />
								<Route path="/blender" component={ColorBlender} />
								<Redirect exact from="/" to="/color-tool" />
								<Redirect exact from="*" to="/color-tool" />
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				)}
			/>
			<ToastContainer hideProgressBar={true} enableMultiContainer containerId="toasts-container" position={toast.POSITION.TOP_RIGHT} />
		</Router>
	);
};

export default App;
