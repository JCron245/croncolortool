import { FC } from 'react';
import './about.scss';
import { Grid } from '@material-ui/core';
import pages from './about.json';
import { AboutCard } from './aboutCard/AboutCard';

export const About: FC = () => {
	return (
		<Grid container className="about full-page" justify="space-evenly" alignItems="center">
			{pages.map((item: any) => {
				return (
					<Grid item>
						<AboutCard item={item} />
					</Grid>
				);
			})}
		</Grid>
	);
};
