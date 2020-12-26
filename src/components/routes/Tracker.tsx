/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

export const usePageTracking = () => {
	const location = useLocation();
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		if (!window.location.href.includes('localhost')) {
			ReactGA.initialize(`${process.env.REACT_APP_GA_TOKEN}`);
			setInitialized(true);
		}
	}, []);

	useEffect(() => {
		if (initialized) {
			ReactGA.pageview(location.pathname + location.search);
		}
	}, [initialized, location]);
};
