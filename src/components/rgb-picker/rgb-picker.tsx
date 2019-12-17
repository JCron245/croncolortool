import React, { FC } from 'react';
import chroma from 'chroma-js';
import './rgb-picker.scss';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

interface RGBPicker {
	rgb: number[];
	onChange?: any;
	onChangeComplete?: any;
}

const RGBPicker: FC<RGBPicker> = (props: RGBPicker) => {
	const rgb = props.rgb;

	const rgbChange = (event: any, part: string, complete: boolean = false) => {
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
		}
		if (complete) {
			props.onChangeComplete(chroma(rgb).hex());
		} else {
			props.onChange(chroma(rgb).hex());
		}
	};

	return (
		<fieldset className="slider-fieldset">
			<legend className="sr-only">RGB Sliders</legend>
			<label className="slider-label red">
				Red
				<InputRange
					maxValue={255}
					minValue={0}
					value={rgb[0]}
					onChange={value => rgbChange(value, 'r')}
					onChangeComplete={value => rgbChange(value, 'r', true)}
				/>
			</label>
			<label className="slider-label green">
				Green
				<InputRange
					maxValue={255}
					minValue={0}
					value={rgb[1]}
					onChange={value => rgbChange(value, 'g')}
					onChangeComplete={value => rgbChange(value, 'g', true)}
				/>
			</label>
			<label className="slider-label blue">
				Blue
				<InputRange
					maxValue={255}
					minValue={0}
					value={rgb[2]}
					onChange={value => rgbChange(value, 'b')}
					onChangeComplete={value => rgbChange(value, 'b', true)}
				/>
			</label>
		</fieldset>
	);
};

export default RGBPicker;
