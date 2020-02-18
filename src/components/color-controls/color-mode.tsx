import React, { FC } from 'react';
import './color-mode.scss';
import { useSelector, useDispatch } from 'react-redux';
import { State, Color } from '../../redux/interfaces';
import { setMode } from '../../redux/actions/colorAction';
import { toast } from 'react-toastify';
import { css } from 'glamor';
import ReactGA from 'react-ga';

export const ColorMode: FC = () => {
	const store: Color = useSelector((store: State) => store.color);
	const dispatch = useDispatch();

	const toastOptions = {
		containerId: 'toasts-container',
		autoClose: 1500,
		closeButton: false,
		type: toast.TYPE.SUCCESS,
		className: css({
			backgroundColor: store.hex,
			color: store.contrastColor,
			border: `1px solid ${store.contrastColor}`,
			textAlign: 'center'
		})
	};

	const changeMode = (event: any) => {
		const modeChangeEvent = event.currentTarget.value;
		if (modeChangeEvent && modeChangeEvent !== store.mode) {
			dispatch(setMode(modeChangeEvent));
			ReactGA.event({
				category: 'Color Mode',
				action: 'changed mode',
				label: modeChangeEvent
			});
			toast(`Color mode switched to ${modeChangeEvent.toUpperCase()}`, toastOptions);
		}
	};

	const activeStyle = {
		backgroundColor: store.hex,
		color: store.contrastColor
	};

	return (
		<form className="color-mode-controls">
			<button
				value="hex"
				aria-label="Switch Colors To Hex Mode"
				onClick={changeMode}
				className={store.mode === 'hex' ? 'mode-control active' : 'mode-control'}
				aria-pressed={store.mode === 'hex'}
				title="switch to hex"
				style={store.mode === 'hex' ? activeStyle : {}}
				type="button">
				Hex
			</button>
			<button
				value="rgb"
				aria-label="Switch Colors To RGB Mode"
				aria-pressed={store.mode === 'rgb'}
				onClick={changeMode}
				className={store.mode === 'rgb' ? 'mode-control active' : 'mode-control'}
				title="switch to rgb"
				style={store.mode === 'rgb' ? activeStyle : {}}
				type="button">
				Rgb
			</button>
			<button
				value="hsl"
				aria-label="Switch Colors To HSL Mode"
				aria-pressed={store.mode === 'hsl'}
				onClick={changeMode}
				className={store.mode === 'hsl' ? 'mode-control active' : 'mode-control'}
				title="switch to hsl"
				style={store.mode === 'hsl' ? activeStyle : {}}
				type="button">
				Hsl
			</button>
		</form>
	);
};

export default ColorMode;
