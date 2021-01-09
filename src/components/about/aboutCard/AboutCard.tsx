/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from 'react';
import { Card, Typography, CardContent, CardActions, Button, withStyles, CardActionArea, CardMedia } from '@material-ui/core';
import random from '../../../assets/cc-random.png';
import blender from '../../../assets/cc-blender.png';
import contrast from '../../../assets/cc-contrast.png';
import palette from '../../../assets/cc-palette.png';
import npm from '../../../assets/cc-npm.png';
import tool from '../../../assets/cc-tool.png';
import { AboutCardList } from './AboutCardList';

const CronCard = withStyles({
	root: {
		marginBottom: '2rem',
		maxWidth: `460px`,
		height: 'fit-content',
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
		default:
			return '';
	}
};

export interface AboutCardProps {
	item: any;
}

export const AboutCard: FC<AboutCardProps> = (props: AboutCardProps) => {
	const { item } = props;

	return (
		<CronCard elevation={3} key={item.title}>
			<CardActionArea>
				<CardMedia
					image={getImgSrc(item.image)}
					title={item.imageTitle}
					style={{ height: '16rem', backgroundSize: 'cover', width: '100%' }}
				/>
			</CardActionArea>
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
			<CardActions>
				<Button size="small" color="primary">
					Try It Out
				</Button>
			</CardActions>
		</CronCard>
	);
};
