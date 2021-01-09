/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from 'react';
import './about.scss';
import { Typography } from '@material-ui/core';
import pages from './about.json';
import { AboutCard } from './aboutCard/AboutCard';

export const About: FC = () => {
	return (
		<div className={'about'}>
			<Typography style={{ width: '100%' }}>This is a summary of why I did this</Typography>

			{pages.map((item: any) => {
				return <AboutCard item={item} />;
			})}
		</div>
	);
};
