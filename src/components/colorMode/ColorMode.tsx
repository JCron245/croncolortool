import React, { FC } from 'react';
import './colorMode.scss';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../redux/interfaces';
import { setMode } from '../../redux/actions/colorAction';
import { toast } from 'react-toastify';
import { css } from 'glamor';
import ReactGA from 'react-ga';

const ColorMode: FC = () => {
	const hex: string = useSelector((store: State) => store.color.hex);
	const contrastColor: string = useSelector((store: State) => store.color.contrastColor);
	const mode: string = useSelector((store: State) => store.color.mode);
	const dispatch = useDispatch();

	const toastOptions = {
		containerId: 'toasts-container',
		autoClose: 1500,
		closeButton: false,
		type: toast.TYPE.SUCCESS,
		className: css({
			backgroundColor: hex,
			color: contrastColor,
			border: `1px solid ${contrastColor}`,
			textAlign: 'center'
		})
	};

	const changeMode = (event: any) => {
		const modeChangeEvent = event.currentTarget.value;
		if (modeChangeEvent && modeChangeEvent !== mode) {
			dispatch(setMode(modeChangeEvent));
			ReactGA.event({
				category: 'Color Mode',
				action: 'changed mode',
				label: modeChangeEvent
			});
			toast(`Color mode switched to ${modeChangeEvent.toUpperCase()}`, toastOptions);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	};

	const activeStyle = {
		backgroundColor: hex,
		color: contrastColor
	};

	return (
		<form className="color-mode-controls">
			<button
				value="hex"
				aria-label="Switch Colors To Hex Mode"
				onClick={changeMode}
				className={mode === 'hex' ? 'mode-control active' : 'mode-control'}
				aria-pressed={mode === 'hex'}
				title="switch to hex"
				style={mode === 'hex' ? activeStyle : {}}
				type="button">
				Hex
			</button>
			<button
				value="rgb"
				aria-label="Switch Colors To RGB Mode"
				aria-pressed={mode === 'rgb'}
				onClick={changeMode}
				className={mode === 'rgb' ? 'mode-control active' : 'mode-control'}
				title="switch to rgb"
				style={mode === 'rgb' ? activeStyle : {}}
				type="button">
				Rgb
			</button>
			<button
				value="hsl"
				aria-label="Switch Colors To HSL Mode"
				aria-pressed={mode === 'hsl'}
				onClick={changeMode}
				className={mode === 'hsl' ? 'mode-control active' : 'mode-control'}
				title="switch to hsl"
				style={mode === 'hsl' ? activeStyle : {}}
				type="button">
				Hsl
			</button>
		</form>
	);
};

export default ColorMode;
