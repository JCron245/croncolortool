import React, { FC } from 'react';
import Select from 'react-select';
import './colorSaver.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { css } from 'glamor';
import { setColor } from '../../redux/actions/colorAction';
import { State } from '../../redux/interfaces';
import { event as ReactGAEvent } from 'react-ga';
import { push } from 'connected-react-router';
import { TinyColor } from '@ctrl/tinycolor';

export const ColorSaver: FC = () => {
	const hex: string = useSelector((store: State) => store.color.hex);
	const contrastColor: string = useSelector((store: State) => store.color.contrastColor);
	const mode: string = useSelector((store: State) => store.color.mode);
	const dispatch = useDispatch();
	const colors = localStorage.getItem('saved-colors') || undefined;
	let parsedColors: { value: string; label: string }[] = colors ? JSON.parse(colors) : [];
	const rgb = new TinyColor(hex).toRgbString();
	const hsl = new TinyColor(hex).toHsl();
	const hslString = `${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%`;
	const value = mode === 'hex' ? hex : mode === 'rgb' ? rgb : hslString;
	const currentValue = { value, label: value };

	const selectColor = (event: any) => {
		dispatch(push(`/color-tool/?color=${event.value}`));
		dispatch(setColor(event.value));
	};

	const toastOptions = {
		containerId: 'toasts-container',
		autoClose: 1500,
		closeButton: false,
		type: toast.TYPE.SUCCESS,
		className: css({
			backgroundColor: hex,
			color: contrastColor,
			border: `1px solid ${contrastColor}`,
			textAlign: 'center',
		}).toString(),
	};

	const saveColor = () => {
		let toastMsg;
		if (!parsedColors.find((color) => color.value === hex)) {
			parsedColors.push({
				value: `${hex}`,
				label: `${hex}`,
			});
			localStorage.setItem('saved-colors', JSON.stringify(parsedColors));
			toastMsg = `${hex.toUpperCase()} Saved!`;
			ReactGAEvent({
				category: 'Color Saver',
				action: 'Saved a color',
				label: hex,
			});
		} else {
			toastMsg = `${hex.toUpperCase()} Is already saved!`;
		}

		toast(toastMsg, toastOptions);
	};

	const deleteColor = () => {
		let toastMsg;
		if (parsedColors.find((c) => c.value === hex)) {
			toastMsg = `${hex} deleted!`;
			parsedColors = parsedColors.filter((c) => c.value !== hex);
			localStorage.setItem('saved-colors', JSON.stringify(parsedColors));
			ReactGAEvent({
				category: 'Color Saver',
				action: 'Deleted a color',
				label: hex,
			});
		} else {
			toastMsg = 'Unable to delete!';
		}
		toast(toastMsg, toastOptions);
		selectColor(parsedColors[0] || { value: '#0FADED' });
	};

	return (
		<form className="color-saver-controls">
			<label className="color-saver-label" htmlFor="react-select-3-input">
				Color Saver
			</label>
			<Select
				options={parsedColors}
				onChange={selectColor}
				value={currentValue}
				className={'color-saver-control-select'}
				classNamePrefix={'color-saver-control-select'}
				noOptionsMessage={() => 'No colors saved'}
				menuPlacement="top"
			/>
			<button className="btn save-btn" aria-label={`Save color ${currentValue.value}`} type="button" onClick={saveColor}>
				Save
			</button>
			<button className="btn delete-btn" aria-label={`Delete color ${currentValue.value}`} type="button" onClick={deleteColor}>
				Delete
			</button>
		</form>
	);
};
