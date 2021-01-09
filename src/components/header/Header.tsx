import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';
import logo from '../../assets/logo.png';
import { AppBar, Toolbar, Button, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DiceIcon from '@material-ui/icons/Casino';
import HelpIcon from '@material-ui/icons/Help';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import BuildIcon from '@material-ui/icons/Build';
import CompareIcon from '@material-ui/icons/Compare';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';

const Header: FC = () => {
	const [drawerToggle, setDrawerToggle] = useState(false);
	const [version] = useState(process.env.REACT_APP_VERSION);

	const flipDrawerToggle = () => {
		setDrawerToggle(!drawerToggle);
	};

	return (
		<AppBar className="header-appbar" component={'header'} position="sticky">
			<Toolbar className="header-menu-wrap">
				<Button onClick={flipDrawerToggle}>
					<img src={logo} className="header-logo" alt="Cron Color Logo" />
				</Button>
				<Button
					aria-controls="simple-menu"
					aria-haspopup="true"
					aria-label="Menu Toggle"
					className="header-menu-button"
					onClick={flipDrawerToggle}>
					<MenuIcon />
				</Button>
				<Drawer anchor={'left'} open={drawerToggle} onClose={flipDrawerToggle}>
					<Divider />
					<List>
						<ListItem button component={NavLink} to={'/blender'}>
							<ListItemIcon>
								<CallMergeIcon />
							</ListItemIcon>
							<ListItemText primary={'Color Blender'} />
						</ListItem>
						<ListItem button component={NavLink} to={'/color-tool'}>
							<ListItemIcon>
								<BuildIcon />
							</ListItemIcon>
							<ListItemText primary={'Color Tool'} />
						</ListItem>
						<ListItem button component={NavLink} to={'/contrast'}>
							<ListItemIcon>
								<CompareIcon />
							</ListItemIcon>
							<ListItemText primary={'Contrast Checker'} />
						</ListItem>
						<ListItem button component={NavLink} to={'/palette'}>
							<ListItemIcon>
								<PaletteOutlinedIcon />
							</ListItemIcon>
							<ListItemText primary={'Palette'} />
						</ListItem>
						<ListItem button component={NavLink} to={'/random'}>
							<ListItemIcon>
								<DiceIcon />
							</ListItemIcon>
							<ListItemText primary={'Random Color'} />
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem button component={NavLink} to={'/about'}>
							<ListItemIcon>
								<HelpIcon />
							</ListItemIcon>
							<ListItemText primary={'About'} />
						</ListItem>
						<ListItem className={'version'}>
							<ListItemIcon>
								<InfoIcon />
							</ListItemIcon>
							<ListItemText aria-label={`Version Number: ${version}`} primary={`v: ${version}`} />
						</ListItem>
					</List>
				</Drawer>
			</Toolbar>
		</AppBar>
	);
};

export { Header };
