import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.scss';
import logo from '../../../assets/cron-color-logov2.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export const Navigation: FC = () => {
	return (
		<Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
			<Navbar.Brand>
				<img src={logo} className="app-logo" alt="Cron Color Logo" />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<Nav.Link eventKey="1" as={NavLink} activeClassName="active" to="/color-tool" exact>
						Color Tool
					</Nav.Link>
					<Nav.Link eventKey="2" as={NavLink} activeClassName="active" to="/contrast" exact>
						Contrast Checker
					</Nav.Link>
					{/* <Nav.Link eventKey="3" as={NavLink} activeClassName="active" to="/blender" exact>
						Color Blender
					</Nav.Link> */}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Navigation;
