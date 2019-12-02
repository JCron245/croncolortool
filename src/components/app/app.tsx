import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import './app.scss';
import ExtendedSwatch from '../extended-swatch/extended-swatch';
import { ToastContainer, toast } from 'react-toastify';
import logo from '../../assets/cron-color-logo.png';
import ContrastChecker from '../contrast-checker/contrast-checker';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const App: React.FC = () => {
	return (
		<Router>
			<main className="app">
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
				<Switch>
					<Route path="/contrast" component={ContrastChecker} />
					<Route path="/color-tool" component={ExtendedSwatch} />
					<Redirect exact from="/" to="/color-tool" />
					<Redirect exact from="*" to="/color-tool" />
				</Switch>
				<ToastContainer hideProgressBar={true} enableMultiContainer containerId="toasts-container" position={toast.POSITION.TOP_RIGHT} />
			</main>
		</Router>
	);
};

export default App;
