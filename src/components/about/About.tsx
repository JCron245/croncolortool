import { FC } from 'react';
import './about.scss';
import { Grid } from '@material-ui/core';
import cards from './about.json';
import { AboutCard } from './aboutCard/AboutCard';

export interface CardInfo {
	image: string;
	imageTitle: string;
	title: string;
	description: string[];
	lists?: CardList[];
	link?: string;
}

export interface CardList {
	title: string;
	value: CardListItem[];
}

export interface CardListItem {
	title: string;
	link?: string;
	description: string;
}

export const About: FC = () => {
	return (
		<Grid container className="about full-page" justify="space-evenly" alignItems="flex-start" spacing={3}>
			{cards.map((card: CardInfo) => {
				return (
					<Grid item key={card.image} xs={12} sm={6} lg={4} xl={3}>
						<AboutCard card={card} />
					</Grid>
				);
			})}
		</Grid>
	);
};
