import React, { FC } from 'react';
import Select from 'react-select';
import './color-saver.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { css } from 'glamor';
import { setColor } from '../../redux/actions/colorAction';
import { State } from '../../redux/interfaces';

interface ColorSaver {
	color: string;
	contrastColor: string;
}

const initialSave = [{ value: '#0faded', label: '#0faded' }];

export const ColorSaver: FC<ColorSaver> = (props: ColorSaver) => {
	const store: State = useSelector((store: State) => store);
	const dispatch = useDispatch();

	const selectColor = (event: any) => dispatch(setColor(event.value));

	let colors = localStorage.getItem('saved-colors') || undefined;
	let parsedColors: { value: string; label: string }[] = colors
		? JSON.parse(colors)
		: initialSave;

	let currentValue = { value: store.hex, label: store.hex };

	const saveColor = () => {
		let toastMsg = '';
		if (!parsedColors.find(color => color.value === props.color)) {
			parsedColors.push({ value: `${props.color}`, label: `${props.color}` });
			localStorage.setItem('saved-colors', JSON.stringify(parsedColors));
			toastMsg = `${props.color.toUpperCase()} Saved to localstorage!`;
		} else {
			toastMsg = `${props.color.toUpperCase()} Is already saved to localstorage!`;
		}

		toast(toastMsg, {
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
		});
	};

	return (
		<div className="color-saver-controls">
			<Select
				options={parsedColors}
				onChange={selectColor}
				value={currentValue}
			/>
			<button onClick={saveColor}>Save</button>
		</div>
	);
};

export default ColorSaver;
