import React, { FC, memo } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import copy from 'clipboard-copy';
import { event as ReactGAEVent } from 'react-ga';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../redux/interfaces';
import { setCopied } from '../../redux/actions/colorAction';

interface ColorBar {
	hex: string;
	groupName: string;
	value: string;
	contrastColor: string;
}

const ColorBar: FC<ColorBar> = (props: ColorBar) => {
	const copied: string = useSelector((store: State) => store.color.copied);
	const dispatch = useDispatch();

	const singleClick = (event: any) => {
		const val = event.currentTarget.value.toUpperCase();
		copy(val).then(
			() => {
				// I don't want someone going nuts like me and clicking this a thousand times and saturating my analytics :)
				if (val !== copied) {
					ReactGAEVent({
						category: 'Color Copy',
						action: 'Color copied',
						label: val,
					});
					dispatch(setCopied(val));
				}
				toast(`${val} copied to clipboard!`, {
					containerId: 'toasts-container',
					autoClose: 1500,
					closeButton: false,
					type: toast.TYPE.SUCCESS,
					className: css({
						backgroundColor: props.hex,
						color: props.contrastColor,
						border: `2px solid ${props.contrastColor}`,
						textAlign: 'center',
					}).toString(),
				});
			},
			(err) => {
				console.error('[ERROR] ', err);
			}
		);
	};

	const colorBarStyle = {
		backgroundColor: props.hex,
		color: props.contrastColor,
	};

	return (
		<li className="color-bar-wrap">
			<button
				onClick={singleClick}
				aria-labelledby={`${props.groupName.replace(' ', '-')}-swatch`}
				aria-label={`Select to copy ${props.value} to your clipboard`}
				value={props.value}
				className="color-bar"
				style={colorBarStyle}
				type="button">
				{props.value}
			</button>
		</li>
	);
};

export default memo(ColorBar);
