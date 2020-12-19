import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';
import logo from '../../assets/cron-color-logov2.png';
import { Menu, MenuItem, AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const Header: FC = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<header>
			<AppBar className="header-appbar" position="sticky">
				<Toolbar>
					<Typography>
						<img src={logo} className="header-logo" alt="Cron Color Logo" />
					</Typography>
					<div className="header-menu-wrap">
						<Button aria-controls="simple-menu" aria-haspopup="true" className="header-menu-button" onClick={handleClick}>
							Menu
						</Button>
						<Menu anchorEl={anchorEl} className="header-menu" id="simple-menu" keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
							<MenuItem component={NavLink} to={'/color-tool'} onClick={handleClose}>
								Color Tool
							</MenuItem>
							<MenuItem component={NavLink} to={'/contrast'} onClick={handleClose}>
								Contrast Checker
							</MenuItem>
							<MenuItem component={NavLink} to={'/random'} onClick={handleClose}>
								Random Color
							</MenuItem>
							<MenuItem component={NavLink} to={'/blender'} onClick={handleClose}>
								Color Blender
							</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</header>
	);
};

export { Header };
