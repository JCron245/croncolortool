import { FC } from 'react';
import './colorTool.scss';
import { RootState } from '../../redux/interfaces';
import { push } from 'connected-react-router';
import useDebouncy from 'use-debouncy';
import { Grid } from '@material-ui/core';
import { ColorControl } from '../colorControl/ColorControl';
import { SwatchContainer } from '../swatchContainer/SwatchContainer';
import { setColorRGBA, setColorHex, setColorHSLA, setShow } from '../../redux/actions/colorAction';
import { useSelector, useDispatch } from 'react-redux';
import { setMode } from '../../redux/actions/colorAction';
import { toast } from 'react-toastify';
import { toastOptions } from '../../utils/getToastOptions';

export const ColorTool: FC = () => {
	const contrastColor: string = useSelector((store: RootState) => store.color.contrastColor);
	const dispatch = useDispatch();
	const hex: string = useSelector((store: RootState) => store.color.hex);
	const hsla: string = useSelector((store: RootState) => store.color.hsla);
	const isAlpha: boolean = useSelector((store: RootState) => store.color.alphaEnabled);
	const mode: string = useSelector((store: RootState) => store.color.mode);
	const rgba: string = useSelector((store: RootState) => store.color.rgba);
	const showLabels: boolean = useSelector((store: RootState) => store.color.showLabels);

	const changeMode = (event: any) => {
		const modeChangeEvent = event.currentTarget.value;
		if (modeChangeEvent !== mode) {
			dispatch(setMode(modeChangeEvent));
			toast(`Color mode switched to ${modeChangeEvent.toUpperCase()}`, toastOptions(hex, contrastColor));
		}
	};

	const toggleLabels = (show: boolean) => {
		dispatch(setShow(show));
	};

	const colorUpdateRgba = (value: string) => {
		if (value !== rgba) {
			dispatch(setColorRGBA(value));
		}
	};

	const colorUpdate = (value: string) => {
		if (value !== hex) {
			dispatch(setColorHex(value));
		}
	};

	const colorUpdateHSLA = (value: string) => {
		if (value !== hsla) {
			dispatch(setColorHSLA(value));
		}
	};

	useDebouncy(
		() => {
			dispatch(push(`/color-tool?color=${hex.substring(1)}`));
		},
		400,
		[hex]
	);

	return (
		<Grid container style={{ minHeight: 'calc(100vh - 75px)' }}>
			<h1 className="sr-only">Color Tool</h1>
			<Grid container item xs={12} sm={4} lg={3} xl={3}>
				<ColorControl
					hex={hex}
					hsla={hsla}
					isAlpha={isAlpha}
					mode={mode}
					onColorUpdateHSLA={colorUpdateHSLA}
					onColorUpdateHex={colorUpdate}
					onColorUpdateRgba={colorUpdateRgba}
					onModeChange={changeMode}
					onShowLabelChange={toggleLabels}
					rgba={rgba}
					showLabels={showLabels}
				/>
			</Grid>
			<Grid container justify="space-evenly" item xs={12} sm={8} lg={9} xl={9}>
				<SwatchContainer />
			</Grid>
		</Grid>
	);
};
