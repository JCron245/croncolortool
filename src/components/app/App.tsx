import { ReactElement, useState, useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import './app.scss';
import { ToastContainer, toast } from 'react-toastify';
import { Header } from '../header/Header';
import { Helmet } from 'react-helmet';
import { ThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';
import { Routes } from '../routes/Routes';
import { usePageTracking } from '../routes/Tracker';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#0FADED' },
		type: 'dark',
		background: {
			paper: '#161d1d',
		},
	},
});

export const App = (): ReactElement => {
	const location = useLocation();
	const [title, setTitle] = useState<string>();
	const [meta, setMeta] = useState<any>();
	usePageTracking();

	useEffect(() => {
		let descriptionContent = '';
		let keywordsContent = '';
		switch (location.pathname) {
			case '/color-tool':
				setTitle('Color Manipulation Tool');
				descriptionContent =
					'Color manipulation and swatch generation tool. Convert between; Hex, Hex8, RGB, RGBA, HSL, HSLA. Generate color swatches of; Analogous, Complementary, Split Complement, Triadic, Tetradic, Monochromatic, and more.';
				keywordsContent = 'hex,hex8,rgb,rgba,hsl,hsla,analogous,complementary,split,triadic,tetradic,monochromatic';
				break;
			case '/contrast':
				setTitle('Contrast Checker Tool');
				descriptionContent =
					'Contrast checking tool allows you to compare the contrast between two colors. This can help you determine how good two colors look together and if they will pass WCAG guidelines for color contrast.';
				keywordsContent = 'contrast,wcag,ada';
				break;
			case '/random':
				setTitle('Random Color Generator');
				descriptionContent = 'A tool to generate random colors.';
				break;
			case '/blender':
				setTitle('Color Blender');
				descriptionContent = 'A tool to mix two colors and get the resulting color.';
				break;
			case '/about':
				setTitle('About Cron Color');
				descriptionContent = 'About page';
				break;
			case '/palette':
				setTitle('Color Palette');
				descriptionContent = 'A virtual color palette, save up to 8 colors at a time and see them all side by side.';
				break;
			default:
				setTitle('Cron Color');
		}
		const metaObj = [
			{
				name: 'description',
				content: descriptionContent,
			},
			{ name: 'keywords', content: keywordsContent },
		];
		setMeta(metaObj);
	}, [location]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Helmet title={title} meta={meta} />
			<Header />
			<Suspense fallback={<div>Loading...</div>}>
				<Routes />
			</Suspense>
			<ToastContainer hideProgressBar={true} enableMultiContainer containerId="toasts-container" position={toast.POSITION.TOP_RIGHT} />
		</ThemeProvider>
	);
};
