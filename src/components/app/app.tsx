import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './app.scss';
import ExtendedSwatch from '../extended-swatch/extended-swatch';
import { ToastContainer, toast } from 'react-toastify';
import logo from '../../assets/colorwheel.svg';

const App: React.FC = () => {
	return (
		<Router>
			<div className="app">
				<header className="app-header">
					<img
						src={logo}
						className="app-logo"
						alt="logo"
						style={{ maxHeight: '35px' }}
					/>
					<p>Cron Color</p>
					<nav>
						<ul>
							{/* <li>
								<Link to="/">Color Tool</Link>
							</li> */}
							{/* <li>
								<Link to="/contrast">Contrast Checker</Link>
							</li> */}
						</ul>
					</nav>
				</header>
				<Switch>
					{/* <Route path="/contrast">
						<ContrastChecker />
					</Route> */}
					<Route path="/">
						<ExtendedSwatch />
					</Route>
				</Switch>
				<ToastContainer
					hideProgressBar={true}
					enableMultiContainer
					containerId="toasts-container"
					position={toast.POSITION.BOTTOM_RIGHT}
				/>
			</div>
		</Router>
	);
};

export default App;
