import React, { FC } from 'react';
import chroma from 'chroma-js';
import './rgb-picker.scss';

interface RGBPicker {
	rgb: number[];
	onChange: any;
}

const RGBPicker: FC<RGBPicker> = (props: RGBPicker) => {
	const rgb = props.rgb;

	const rgbChange = (event: any, part: string) => {
		let newRgb = rgb;
		switch (part) {
			case 'r':
				newRgb[0] = event;
				break;
			case 'g':
				newRgb[1] = event;
				break;
			case 'b':
				newRgb[2] = event;
				break;
			default:
				break;
		}
		props.onChange(chroma(rgb).hex());
	};

	return (
		<>
			<label className="slider-label">
				R: {rgb[0]}
				<input
					type="range"
					min="0"
					max="255"
					className="slider red"
					value={rgb[0]}
					onChange={e => {
						rgbChange(e.target.value, 'r');
					}}
				/>
			</label>
			<label className="slider-label">
				G: {rgb[1]}
				<input
					type="range"
					min="0"
					max="255"
					className="slider green"
					value={rgb[1]}
					onChange={e => {
						rgbChange(e.target.value, 'g');
					}}
				/>
			</label>
			<label className="slider-label">
				B: {rgb[2]}
				<input
					type="range"
					min="0"
					max="255"
					className="slider blue"
					value={rgb[2]}
					onChange={e => {
						rgbChange(e.target.value, 'b');
					}}
				/>
			</label>
		</>
	);
};

export default RGBPicker;
