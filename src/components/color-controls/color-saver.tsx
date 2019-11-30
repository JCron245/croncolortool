import React, { FC } from 'react';
import Select from 'react-select';
import './color-saver.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { css } from 'glamor';
import { setColor } from '../../redux/actions/colorAction';
import { State } from '../../redux/interfaces';
import chroma from 'chroma-js';
import tinycolor from 'tinycolor2';
import ReactGA from 'react-ga';

interface ColorSaver {
	color: string;
	contrastColor: string;
}

export const ColorSaver: FC<ColorSaver> = (props: ColorSaver) => {
	const store: State = useSelector((store: State) => store);
	const dispatch = useDispatch();

	const selectColor = (event: any) => dispatch(setColor(event.value));

	let colors = localStorage.getItem('saved-colors') || undefined;
	let parsedColors: { value: string; label: string }[] = colors
		? JSON.parse(colors)
		: [];

	const rgb = chroma(store.hex)
		.rgb()
		.toString();

	const hsl = tinycolor(store.hex).toHsl();
	const hslString = `${Math.floor(hsl.h)}, ${Math.floor(
		hsl.s * 100
	)}%, ${Math.floor(hsl.l * 100)}%`;

	const value =
		store.mode === 'hex' ? store.hex : store.mode === 'rgb' ? rgb : hslString;
	let currentValue = { value, label: value };

	const saveColor = () => {
		let toastMsg = '';
		if (!parsedColors.find(color => color.value === store.hex)) {
			parsedColors.push({
				value: `${store.hex}`,
				label: `Hex: ${store.hex} - Rgb(${rgb})`
			});
			localStorage.setItem('saved-colors', JSON.stringify(parsedColors));
			toastMsg = `${store.hex.toUpperCase()} Saved!`;
			ReactGA.event({
				category: 'Color Saver',
				action: 'Saved a color',
				value: store.hex
			});
		} else {
			toastMsg = `${store.hex.toUpperCase()} Is already saved!`;
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

	const deleteColor = () => {
		let toastMsg = '';
		if (parsedColors.find(c => c.value === store.hex)) {
			toastMsg = `${store.hex} deleted!`;
			parsedColors = parsedColors.filter(c => c.value !== store.hex);
			localStorage.setItem('saved-colors', JSON.stringify(parsedColors));
			ReactGA.event({
				category: 'Color Saver',
				action: 'Deleted a color',
				value: store.hex
			});
		} else {
			toastMsg = 'Unable to delete!';
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
		selectColor(parsedColors[0] || { value: '#0FADED' });
	};

	return (
		<div className="color-saver-controls">
			<Select
				options={parsedColors}
				onChange={selectColor}
				value={currentValue}
				className={'color-saver-control-select'}
				classNamePrefix={'color-saver-control-select'}
				noOptionsMessage={() => 'No colors saved'}
				menuPlacement="top"
			/>
			<button className="btn save-btn" onClick={saveColor}>
				Save
			</button>
			<button className="btn delete-btn" onClick={deleteColor}>
				Delete
			</button>
		</div>
	);
};

export default ColorSaver;
