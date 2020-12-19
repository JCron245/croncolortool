import React, { FC } from 'react';
import { ContrastCompareDemo } from './contrastCompareDemo/ContrastCompareDemo';
import { ContrastCheckState, RootState, ContrastCheckStateColor } from '../../redux/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { ContrastCompareResults } from './contrastCompareResults/ContrastCompareResults';
import { Grid } from '@material-ui/core';
import { ColorControl } from '../colorControl/ColorControl';
import { setBackgroundMode, setTextColorMode, setBackgroundColor, setTextColor } from '../../redux/actions/contrastActions';
import { TinyColor } from '@ctrl/tinycolor';

export const ContrastChecker: FC = () => {
	const store: ContrastCheckState = useSelector((store: RootState) => store.contrast);
	const backgroundColorObject: ContrastCheckStateColor = useSelector((store: RootState) => store.contrast.backgroundColor);
	const textColorObject: ContrastCheckStateColor = useSelector((store: RootState) => store.contrast.textColor);
	const dispatch = useDispatch();

	const textColorUpdate = (value: string) => {
		let tc = new TinyColor(value);
		if (tc.toHexString() !== textColorObject.hex && tc.isValid) {
			dispatch(setTextColor(value));
		}
	};

	const backgroundColorUpdate = (value: string) => {
		let tc = new TinyColor(value);
		if (tc.toHexString() !== backgroundColorObject.hex && tc.isValid) {
			dispatch(setBackgroundColor(value));
		}
	};

	return (
		<Grid container className={'contrast-container'}>
			<h1 className="sr-only">Contrast Compare Tool</h1>
			<Grid container item className={'contrast-controls'} xs={12} sm={4} lg={3}>
				<ColorControl
					hex={backgroundColorObject.hex}
					rgba={backgroundColorObject.rgb}
					hsla={backgroundColorObject.hsl}
					mode={backgroundColorObject.mode}
					disableAlpha={true}
					onModeChange={(event: any) => dispatch(setBackgroundMode(event.currentTarget.value))}
					onColorUpdateHex={backgroundColorUpdate}
					onColorUpdateHSLA={backgroundColorUpdate}
					onColorUpdateRgba={backgroundColorUpdate}
					title={'Background Color'}
				/>
				<ColorControl
					hex={textColorObject.hex}
					rgba={textColorObject.rgb}
					hsla={textColorObject.hsl}
					mode={textColorObject.mode}
					disableAlpha={true}
					onModeChange={(event: any) => dispatch(setTextColorMode(event.currentTarget.value))}
					onColorUpdateHex={textColorUpdate}
					onColorUpdateHSLA={textColorUpdate}
					onColorUpdateRgba={textColorUpdate}
					title={'Text Color'}
				/>
			</Grid>
			<Grid container item xs={12} sm={8} lg={9}>
				<Grid
					container
					item
					alignItems={'center'}
					justify={'space-evenly'}
					xs={12}
					style={{
						backgroundColor: backgroundColorObject.hex,
						color: textColorObject.hex,
						height: '75%',
					}}>
					<ContrastCompareDemo textColor={textColorObject.hex} backgroundColor={backgroundColorObject.hex} />
				</Grid>
				<Grid
					container
					item
					alignItems={'center'}
					justify={'center'}
					xs={12}
					style={{
						height: '25%',
					}}>
					<ContrastCompareResults
						contrastRatio={store.ratio}
						smallAA={store.wcagPasses.small.aa}
						smallAAA={store.wcagPasses.small.aaa}
						largeAA={store.wcagPasses.large.aa}
						largeAAA={store.wcagPasses.large.aaa}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};
