import React, { FC } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import copy from 'clipboard-copy';
import ReactGA from 'react-ga';

interface ColorBar {
	hex: string;
	groupName: string;
	value: string;
	contrastColor: string;
}

export const ColorBar: FC<ColorBar> = (props: ColorBar) => {
	const singleClick = (event: any) => {
		let savedEvent = event;
		let savedTarget = savedEvent.currentTarget as HTMLInputElement;
		copy(savedTarget.value.toUpperCase()).then(
			() => {
				ReactGA.event({
					category: 'Color Copy',
					action: 'Color copied',
					label: savedTarget.value
				});
				toast(`${savedTarget.value.toUpperCase()} copied to clipboard!`, {
					containerId: 'toasts-container',
					autoClose: 1500,
					closeButton: false,
					type: toast.TYPE.SUCCESS,
					className: css({
						backgroundColor: props.hex,
						color: props.contrastColor,
						border: `2px solid ${props.contrastColor}`,
						textAlign: 'center'
					})
				});
			},
			err => {
				console.error('[ERROR] ', err);
			}
		);
	};

	const colorBarStyle = {
		outlineColor: props.contrastColor,
		backgroundColor: props.hex,
		color: props.contrastColor
	};

	return (
		<button onClick={singleClick} value={props.value} className="color-bar" style={colorBarStyle} type="button">
			<p className="color-bar-title">{props.value}</p>
		</button>
	);
};

export default ColorBar;
