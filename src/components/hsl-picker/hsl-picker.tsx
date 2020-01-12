import React, { FC } from 'react';
import './hsl-picker.scss';
import tinycolor from 'tinycolor2';
import InputRange from 'react-input-range';

interface HSLPicker {
	hsl?: any;
	onChange: any;
	onChangeComplete?: any;
	hex?: string;
}

const HSLPicker: FC<HSLPicker> = (props: HSLPicker) => {
	let hsl = props.hsl;
	if (props.hex) {
		hsl = tinycolor(props.hex).toHsl();
	} else if (props.hsl) {
		hsl = props.hsl;
	}

	const hslChange = (event: any, part: string, complete: boolean = false) => {
		let newHSL = hsl;
		switch (part) {
			case 'h':
				newHSL.h = event;
				break;
			case 's':
				newHSL.s = event / 100;
				break;
			case 'l':
				newHSL.l = event / 100;
				break;
			default:
				break;
		}

		if (complete) {
			props.onChangeComplete(`#${tinycolor(hsl).toHex()}`);
		} else {
			props.onChange(`#${tinycolor(hsl).toHex()}`);
		}
	};

	return (
		<fieldset className="slider-fieldset">
			<legend className="sr-only">HSL Sliders</legend>
			<label className="slider-label hue">
				Hue
				<InputRange
					maxValue={359}
					minValue={0}
					value={Math.floor(hsl.h)}
					onChange={v => {
						hslChange(v, 'h');
					}}
					onChangeComplete={v => {
						hslChange(v, 'h', true);
					}}
				/>
			</label>
			<label className="slider-label saturation">
				Saturation
				<InputRange
					maxValue={100}
					minValue={0}
					value={Math.floor(hsl.s * 100)}
					onChange={v => {
						hslChange(v, 's');
					}}
					onChangeComplete={v => {
						hslChange(v, 's', true);
					}}
				/>
			</label>
			<label className="slider-label lightness">
				Lightness
				<InputRange
					maxValue={100}
					minValue={0}
					value={Math.floor(hsl.l * 100)}
					onChange={v => {
						hslChange(v, 'l');
					}}
					onChangeComplete={v => {
						hslChange(v, 'l', true);
					}}
				/>
			</label>
		</fieldset>
	);
};

export default HSLPicker;
