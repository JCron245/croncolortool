import React, { ReactElement, useState, useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import './app.scss';
import { ToastContainer, toast } from 'react-toastify';
import { Header } from '../header/Header';
import { Helmet } from 'react-helmet';
import { ThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';
import { Routes } from '../routes/Routes';
import { usePageTracking } from '../routes/Tracker';

export const App = (): ReactElement => {
	const location = useLocation();
	const [title, setTitle] = useState<string>();
	usePageTracking();

	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					primary: { main: '#0FADED' },
					type: 'dark',
					background: {
						paper: '#161d1d',
					},
				},
			}),
		[]
	);

	useEffect(() => {
		switch (location.pathname) {
			case '/color-tool':
				setTitle('Color Manipulation Tool');
				break;
			case '/contrast':
				setTitle('Contrast Checker Tool');
				break;
			case '/random':
				setTitle('Random Color Generator');
				break;
			case '/blender':
				setTitle('Color Blender');
				break;
			default:
				setTitle('Cron Color');
		}
	}, [location]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Helmet title={title} />
			<Header />
			<Suspense fallback={<div>Loading...</div>}>
				<Routes />
			</Suspense>
			<ToastContainer hideProgressBar={true} enableMultiContainer containerId="toasts-container" position={toast.POSITION.TOP_RIGHT} />
		</ThemeProvider>
	);
};
