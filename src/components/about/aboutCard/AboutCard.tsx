/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactElement } from 'react';
import { Card, Typography, CardContent, CardActions, Button, withStyles, CardActionArea, CardMedia } from '@material-ui/core';
import random from '../../../assets/cc-random.png';
import blender from '../../../assets/cc-blender.png';
import contrast from '../../../assets/cc-contrast.png';
import palette from '../../../assets/cc-palette.png';
import npm from '../../../assets/cc-npm.png';
import tool from '../../../assets/cc-tool.png';
import logo from '../../../assets/logo.png';
import { AboutCardList } from './AboutCardList';
import { CardInfo, CardList } from '../About';

const CronCard = withStyles({
	root: {
		marginBottom: '2rem',
		height: 'fit-content',
		padding: '.5rem',
	},
})(Card);

const getImgSrc = (image: string): string => {
	switch (image) {
		case 'random':
			return random;
		case 'blender':
			return blender;
		case 'contrast':
			return contrast;
		case 'palette':
			return palette;
		case 'npm':
			return npm;
		case 'tool':
			return tool;
		case 'logo':
			return logo;
		default:
			return '';
	}
};

export interface AboutCardProps {
	card: CardInfo;
}

export const AboutCard: FC<AboutCardProps> = (props: AboutCardProps) => {
	const { card } = props;
	const mediaSrc = getImgSrc(card.image);

	return (
		<CronCard elevation={3} key={card.title}>
			{mediaSrc &&
				(card.link ? (
					<CardActionArea>
						<CardMedia className="about-card-media" image={mediaSrc} title={card.imageTitle} style={{ border: '1px solid #444' }} />
					</CardActionArea>
				) : (
					<CardMedia className="about-card-media" image={mediaSrc} title={card.imageTitle} style={{ border: '1px solid #444' }} />
				))}
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">
					{card.title}
				</Typography>
				{card.description.map((paragraph: string, index: number) => {
					return (
						<Typography key={`${card.image}-description-${index}`} variant="body2" color="textSecondary" component="p">
							{paragraph}
						</Typography>
					);
				})}
			</CardContent>
			<CardContent>
				{card.lists?.map(
					(list: CardList, index: number): ReactElement => {
						return <AboutCardList key={`${card.image}-list-${index}`} list={list} />;
					}
				)}
			</CardContent>
			{card.link && (
				<CardActions>
					<Button size="small" color="primary">
						Try It Out
					</Button>
				</CardActions>
			)}
		</CronCard>
	);
};
