/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback } from 'react';
import { SwatchBar } from './swatchBar/SwatchBar';
import { ColorObject } from '../../utils/colorToolUtils';
import { RootState } from '../../redux/interfaces';
import { setCopied } from '../../redux/actions/colorAction';
import { toastOptions } from '../../utils/getToastOptions';
import './swatch.scss';
import { List, Typography, Grid } from '@material-ui/core';
import copy from 'clipboard-copy';
import { event as ReactGAEVent } from 'react-ga';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

interface SwatchProps {
	colors?: ColorObject[];
	name: string;
	showLabels: boolean;
}

export const Swatch: FC<SwatchProps> = (props: SwatchProps) => {
	const { colors, name, showLabels } = props;
	const boxID = `${name.replace(' ', '-')}-swatch`;
	const boxAriaLabel = `Swatch of ${name} colors`;
	const copied: string = useSelector((store: RootState) => store.color.copied);
	const dispatch = useDispatch();

	const singleClick = useCallback((hex: string, contrastColor: string) => {
		copy(hex).then(
			() => {
				// I don't want someone going nuts like me and clicking this a thousand times and saturating my analytics :)
				if (hex !== copied) {
					ReactGAEVent({
						category: 'Color Copy',
						action: 'Color copied',
						label: hex,
					});
					dispatch(setCopied(hex));
				}
				toast(`${hex} copied to clipboard!`, toastOptions(hex, contrastColor));
			},
			(err) => {
				console.log('[ERROR] Copy Error: ', err);
			}
		);
	}, []);

	const Swatches = colors?.map((c: any, index: number) => {
		const key = `${c.color}-${name}-${index}`;
		return (
			<SwatchBar
				groupName={name}
				hex={c.color}
				showValue={c.showValue}
				contrastColor={c.contrast}
				key={key}
				onClick={singleClick}
				showLabels={showLabels}
			/>
		);
	});

	return (
		<Grid item xs className={'swatch'}>
			<Typography aria-label={boxAriaLabel} className="box-title" id={boxID}>
				{name}
			</Typography>
			<List aria-label="main mailbox folders" className="box-list" component="nav">
				{Swatches}
			</List>
		</Grid>
	);
};
