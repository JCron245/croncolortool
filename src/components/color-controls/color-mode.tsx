import React, { FC } from 'react';
import './color-mode.scss';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../redux/interfaces';
import { setMode } from '../../redux/actions/colorAction';
import { toast } from 'react-toastify';
import { css } from 'glamor';
import ReactGA from 'react-ga';

export const ColorMode: FC = () => {
	const store: State = useSelector((store: State) => store);
	const dispatch = useDispatch();

	const changeMode = (event: any) => {
		const savedEvent = event;
		if (event.currentTarget.value) {
			dispatch(setMode(savedEvent.currentTarget.value));
			ReactGA.event({
				category: 'Color Mode',
				action: 'changed mode',
				value: event.currentTarget.value
			});
			toast(
				`Color mode switched to ${savedEvent.currentTarget.value.toUpperCase()}`,
				{
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
				}
			);
		}
	};

	const activeStyle = {
		backgroundColor: store.hex,
		color: store.contrastColor
	};

	return (
		<div className="color-mode-controls">
			<button
				value="hex"
				onClick={changeMode}
				className={
					store.mode === 'hex' ? 'mode-control active' : 'mode-control'
				}
				title="switch to hex"
				style={store.mode === 'hex' ? activeStyle : {}}
			>
				Hex
			</button>
			<button
				value="rgb"
				onClick={changeMode}
				className={
					store.mode === 'rgb' ? 'mode-control active' : 'mode-control'
				}
				title="switch to rgb"
				style={store.mode === 'rgb' ? activeStyle : {}}
			>
				Rgb
			</button>
			<button
				value="hsl"
				onClick={changeMode}
				className={
					store.mode === 'hsl' ? 'mode-control active' : 'mode-control'
				}
				title="switch to hsl"
				style={store.mode === 'hsl' ? activeStyle : {}}
			>
				Hsl
			</button>
		</div>
	);
};

export default ColorMode;
