import React, { FC } from 'react';
import './hsl-picker.scss';
import tinycolor from 'tinycolor2';

interface HSLPicker {
	hsl: any;
	onChange: any;
}

const HSLPicker: FC<HSLPicker> = (props: HSLPicker) => {
	const hsl = props.hsl;

	const hslChange = (event: any, part: string) => {
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
		props.onChange(`#${tinycolor(hsl).toHex()}`);
	};

	return (
		<>
			<label className="slider-label">
				H {Math.floor(hsl.h)}
				<input
					type="range"
					min="0"
					max="359"
					className="slider hue"
					value={Math.floor(hsl.h)}
					onChange={e => {
						hslChange(e.target.value, 'h');
					}}
				/>
			</label>
			<label className="slider-label">
				S {Math.floor(hsl.s * 100)}%
				<input
					type="range"
					min="0"
					max="100"
					className="slider saturation"
					value={Math.floor(hsl.s * 100)}
					onChange={e => {
						hslChange(e.target.value, 's');
					}}
				/>
			</label>
			<label className="slider-label">
				L {Math.floor(hsl.l * 100)}%
				<input
					type="range"
					min="0"
					max="100"
					className="slider lightness"
					value={Math.floor(hsl.l * 100)}
					onChange={e => {
						hslChange(e.target.value, 'l');
					}}
				/>
			</label>
		</>
	);
};

export default HSLPicker;
