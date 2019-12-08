import React, { FC } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import copy from 'clipboard-copy';
import ReactGA from 'react-ga';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../../redux/interfaces';
import { setCopied } from '../../../redux/actions/colorAction';

interface ColorBar {
	hex: string;
	groupName: string;
	value: string;
	contrastColor: string;
}

export const ColorBar: FC<ColorBar> = (props: ColorBar) => {
	const store: State = useSelector((store: State) => store);
	const dispatch = useDispatch();

	const singleClick = (event: any) => {
		let savedEvent = event;
		let savedTarget = savedEvent.currentTarget as HTMLInputElement;
		copy(savedTarget.value.toUpperCase()).then(
			() => {
				// I don't want someone going nuts like me and clicking this a thousand times and saturating my analytics :)
				if (savedTarget.value !== store.copied) {
					ReactGA.event({
						category: 'Color Copy',
						action: 'Color copied',
						label: savedTarget.value
					});
					dispatch(setCopied(savedTarget.value));
				}
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
		<li className="color-bar-wrap">
			<button
				onClick={singleClick}
				aria-labelledby={props.groupName.replace(' ', '-') + '-swatch'}
				aria-label={'Select to copy ' + props.value + ' to your clipboard'}
				value={props.value}
				className="color-bar"
				style={colorBarStyle}
				type="button">
				<p className="color-bar-title">{props.value}</p>
			</button>
		</li>
	);
};

export default ColorBar;
