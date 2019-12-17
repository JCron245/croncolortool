import React, { FC } from 'react';
import Select from 'react-select';
import './color-saver.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { css } from 'glamor';
import { setColor } from '../../redux/actions/colorAction';
import { State, Color } from '../../redux/interfaces';
import chroma from 'chroma-js';
import tinycolor from 'tinycolor2';
import ReactGA from 'react-ga';
import { push } from 'connected-react-router';

export const ColorSaver: FC = () => {
	const store: Color = useSelector((store: State) => store.color);
	const dispatch = useDispatch();
	const colors = localStorage.getItem('saved-colors') || undefined;
	let parsedColors: { value: string; label: string }[] = colors ? JSON.parse(colors) : [];
	const rgb = chroma(store.hex)
		.rgb()
		.toString();
	const hsl = tinycolor(store.hex).toHsl();
	const hslString = `${Math.floor(hsl.h)}, ${Math.floor(hsl.s * 100)}%, ${Math.floor(hsl.l * 100)}%`;
	const value = store.mode === 'hex' ? store.hex : store.mode === 'rgb' ? rgb : hslString;
	const currentValue = { value, label: value };

	const selectColor = (event: any) => {
		dispatch(push(`/color-tool/?color=${event.value}`));
		dispatch(setColor(event.value));
	};

	const saveColor = () => {
		let toastMsg;
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
				label: store.hex
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
		let toastMsg;
		if (parsedColors.find(c => c.value === store.hex)) {
			toastMsg = `${store.hex} deleted!`;
			parsedColors = parsedColors.filter(c => c.value !== store.hex);
			localStorage.setItem('saved-colors', JSON.stringify(parsedColors));
			ReactGA.event({
				category: 'Color Saver',
				action: 'Deleted a color',
				label: store.hex
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
		<form className="color-saver-controls">
			<label htmlFor="react-select-2-input">Color Saver</label>
			<Select
				options={parsedColors}
				onChange={selectColor}
				value={currentValue}
				className={'color-saver-control-select'}
				classNamePrefix={'color-saver-control-select'}
				noOptionsMessage={() => 'No colors saved'}
				menuPlacement="top"
			/>
			<button className="btn save-btn" aria-label={'Save color ' + currentValue.value} type="button" onClick={saveColor}>
				Save
			</button>
			<button className="btn delete-btn" aria-label={'Delete color ' + currentValue.value} type="button" onClick={deleteColor}>
				Delete
			</button>
		</form>
	);
};

export default ColorSaver;
