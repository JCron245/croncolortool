/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from 'react';
import { Card, Typography, CardContent, CardActions, Button, withStyles, CardActionArea, CardMedia } from '@material-ui/core';
import random from '../../../assets/cc-random.png';
import blender from '../../../assets/cc-blender.png';
import contrast from '../../../assets/cc-contrast.png';
import palette from '../../../assets/cc-palette.png';
import npm from '../../../assets/cc-npm.png';
import tool from '../../../assets/cc-tool.png';
import logo from '../../../assets/logo.png';
import { AboutCardList } from './AboutCardList';

const CronCard = withStyles({
	root: {
		marginBottom: '2rem',
		maxWidth: `485px`,
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
	item: any;
}

export const AboutCard: FC<AboutCardProps> = (props: AboutCardProps) => {
	const { item } = props;
	const mediaSrc = getImgSrc(item.image);

	return (
		<CronCard elevation={3} key={item.title}>
			{mediaSrc &&
				(item.link ? (
					<CardActionArea>
						<CardMedia className="about-card-media" image={mediaSrc} title={item.imageTitle} style={{ border: '1px solid #444' }} />
					</CardActionArea>
				) : (
					<CardMedia className="about-card-media" image={mediaSrc} title={item.imageTitle} style={{ border: '1px solid #444' }} />
				))}
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">
					{item.title}
				</Typography>
				{item.description.map((paragraph: string) => {
					return (
						<Typography variant="body2" color="textSecondary" component="p">
							{paragraph}
						</Typography>
					);
				})}
			</CardContent>
			<CardContent>
				{item.lists?.map((list: any): any => {
					return <AboutCardList item={item} list={list} />;
				})}
			</CardContent>
			{item.link && (
				<CardActions>
					<Button size="small" color="primary">
						Try It Out
					</Button>
				</CardActions>
			)}
		</CronCard>
	);
};
