/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback } from 'react';
import { SwatchBar } from './swatchBar/SwatchBar';
import { ColorObject } from '../../utils/colorToolUtils';
import { RootState } from '../../redux/interfaces';
import { setCopied } from '../../redux/actions/colorAction';
import { toastOptions } from '../../utils/getToastOptions';
import './swatch.scss';
import { List, Typography, Grid } from '@material-ui/core';
import copy from 'clipboard-copy';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { copyEvent } from '../routes/Tracker';

interface SwatchProps {
	colors?: ColorObject[];
	name: string;
	showLabels: boolean;
}

const gaCategory = 'Color Tool';

export const Swatch: FC<SwatchProps> = (props: SwatchProps) => {
	const { colors, name, showLabels } = props;
	const boxAriaLabel = `Swatch of ${name} colors`;
	const boxID = `${name.replace(' ', '-')}-swatch`;
	const copied: string = useSelector((store: RootState) => store.color.copied);
	const dispatch = useDispatch();

	const singleClick = useCallback((color: any, contrastColor: string) => {
		copy(color).then(
			() => {
				// I don't want someone going nuts like me and clicking this a thousand times and saturating my analytics :)
				if (color !== copied) {
					dispatch(setCopied(color));
					copyEvent(true, gaCategory, color);
				}
				toast(`${color} copied to clipboard!`, toastOptions(color, contrastColor));
			},
			(err) => {
				copyEvent(false, gaCategory, color);
			}
		);
	}, []);

	const Swatches = colors?.map((c: any, index: number) => {
		const key = `${c.color}-${name}-${index}`;
		return (
			<SwatchBar
				contrastColor={c.contrast}
				groupName={name}
				hex={c.color}
				key={key}
				onClick={singleClick}
				showLabels={showLabels}
				showValue={c.showValue}
			/>
		);
	});

	return (
		<Grid item xs className="swatch">
			<Typography aria-label={boxAriaLabel} className="box-title" id={boxID}>
				{name}
			</Typography>
			<List aria-label="main mailbox folders" className="box-list">
				{Swatches}
			</List>
		</Grid>
	);
};
