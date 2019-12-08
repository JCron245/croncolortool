import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import './app.scss';
import ExtendedSwatch from '../extended-swatch/extended-swatch';
import { ToastContainer, toast } from 'react-toastify';
import logo from '../../assets/cron-color-logov2.png';
import ContrastChecker from '../contrast-checker/contrast-checker';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const App: React.FC = () => {
	return (
		<Router>
			<Route
				render={({ location }) => (
					<TransitionGroup className="app" component={'main'}>
						<Navbar bg="dark" expand="lg" variant="dark">
							<Navbar.Brand>
								<img src={logo} className="app-logo" alt="Cron Color Logo" />
							</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="ml-auto">
									<Nav.Link as={NavLink} activeClassName="active" to="/color-tool" exact>
										Color Tool
									</Nav.Link>
									<Nav.Link as={NavLink} activeClassName="active" to="/contrast" exact>
										Contrast Checker
									</Nav.Link>
								</Nav>
							</Navbar.Collapse>
						</Navbar>
						<CSSTransition in={true} timeout={250} classNames="fade" appear={true} key={location.key}>
							<Switch>
								<Route path="/contrast" component={ContrastChecker} />
								<Route path="/color-tool" component={ExtendedSwatch} />
								<Redirect exact from="/" to="/color-tool" />
								<Redirect exact from="*" to="/color-tool" />
							</Switch>
						</CSSTransition>
						<ToastContainer
							hideProgressBar={true}
							enableMultiContainer
							containerId="toasts-container"
							position={toast.POSITION.TOP_RIGHT}
						/>
					</TransitionGroup>
				)}
			/>
		</Router>
	);
};

export default App;
