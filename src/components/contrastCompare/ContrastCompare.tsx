/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useMemo } from 'react';
import { ContrastCompareDemo } from './contrastCompareDemo/ContrastCompareDemo';
import { ContrastCheckState, RootState, ContrastCheckStateColor } from '../../redux/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { ContrastCompareResults } from './contrastCompareResults/ContrastCompareResults';
import { Grid } from '@material-ui/core';
import { ColorControl } from '../colorControl/ColorControl';
import { setBackgroundMode, setTextColorMode, setBackgroundColor, setTextColor } from '../../redux/actions/contrastActions';
import { TinyColor } from '@ctrl/tinycolor';

export const ContrastChecker: FC = () => {
	const backgroundColorObject: ContrastCheckStateColor = useSelector((store: RootState) => store.contrast.backgroundColor);
	const store: ContrastCheckState = useSelector((store: RootState) => store.contrast);
	const textColorObject: ContrastCheckStateColor = useSelector((store: RootState) => store.contrast.textColor);
	const dispatch = useDispatch();

	const textColorUpdate = useMemo(
		() => (value: string) => {
			let tc = new TinyColor(value);
			if (tc.toHexString() !== textColorObject.hex && tc.isValid) {
				dispatch(setTextColor(value));
			}
		},
		[textColorObject.hex]
	);

	const backgroundColorUpdate = useMemo(
		() => (value: string) => {
			let tc = new TinyColor(value);
			if (tc.toHexString() !== backgroundColorObject.hex && tc.isValid) {
				dispatch(setBackgroundColor(value));
			}
		},
		[backgroundColorObject.hex]
	);

	const dispatchBackgroundMode = useMemo(
		() => (event: any) => {
			dispatch(setBackgroundMode(event.target.value));
		},
		[]
	);

	const dispatchTextColorMode = useMemo(
		() => (event: any) => {
			dispatch(setTextColorMode(event.target.value));
		},
		[]
	);

	return (
		<Grid container className="contrast-container">
			<h1 className="sr-only">Contrast Compare Tool</h1>
			<Grid container item className="contrast-controls" xs={12} sm={4} lg={3}>
				<ColorControl
					disableAlpha={true}
					hex={backgroundColorObject.hex}
					hsla={backgroundColorObject.hsl}
					mode={backgroundColorObject.mode}
					onColorUpdateHSLA={backgroundColorUpdate}
					onColorUpdateHex={backgroundColorUpdate}
					onColorUpdateRgba={backgroundColorUpdate}
					onModeChange={dispatchBackgroundMode}
					rgba={backgroundColorObject.rgb}
					title="Background Color"
				/>
				<ColorControl
					disableAlpha={true}
					hex={textColorObject.hex}
					hsla={textColorObject.hsl}
					mode={textColorObject.mode}
					onColorUpdateHSLA={textColorUpdate}
					onColorUpdateHex={textColorUpdate}
					onColorUpdateRgba={textColorUpdate}
					onModeChange={dispatchTextColorMode}
					rgba={textColorObject.rgb}
					title="Text Color"
				/>
			</Grid>
			<Grid container item xs={12} sm={8} lg={9}>
				<Grid
					alignItems="center"
					container
					item
					justify="space-evenly"
					style={{
						backgroundColor: backgroundColorObject.hex,
						color: textColorObject.hex,
						height: '75%',
					}}
					xs={12}>
					<ContrastCompareDemo textColor={textColorObject.hex} backgroundColor={backgroundColorObject.hex} />
				</Grid>
				<Grid
					alignItems="center"
					container
					item
					justify="center"
					style={{
						height: '25%',
					}}
					xs={12}>
					<ContrastCompareResults
						contrastRatio={store.ratio}
						largeAA={store.wcagPasses.large.aa}
						largeAAA={store.wcagPasses.large.aaa}
						smallAA={store.wcagPasses.small.aa}
						smallAAA={store.wcagPasses.small.aaa}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};
