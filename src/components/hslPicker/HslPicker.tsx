import React, { FC } from 'react';
import './hslPicker.scss';
import InputRange from 'react-input-range';
import { TinyColor } from '@ctrl/tinycolor';

interface HSLPicker {
	hex?: any;
	onChange: any;
	onChangeComplete?: any;
}

const HSLPicker: FC<HSLPicker> = (props: HSLPicker) => {
	const hsl = new TinyColor(props.hex).toHsl();

	const setHue = (value: any) => {
		props.onChange(new TinyColor({ h: value, s: hsl.s, l: hsl.l }).toHexString());
	};

	const setSaturation = (value: any) => {
		props.onChange(new TinyColor({ h: hsl.h, s: value / 100, l: hsl.l }).toHexString());
	};

	const setLightness = (value: any) => {
		props.onChange(new TinyColor({ h: hsl.h, s: hsl.s, l: value / 100 }).toHexString());
	};

	const onChangeComplete = () => {
		props.onChangeComplete(new TinyColor({ h: hsl.h, s: hsl.s, l: hsl.l }).toHexString());
	};

	return (
		<fieldset className="slider-fieldset">
			<legend className="sr-only">HSL Sliders</legend>
			<label className="slider-label hue">
				Hue
				<InputRange maxValue={359} minValue={0} value={Math.round(hsl.h)} onChange={setHue} onChangeComplete={onChangeComplete} />
			</label>
			<label className="slider-label saturation">
				Saturation
				<InputRange
					maxValue={100}
					minValue={0}
					value={Math.round(hsl.s * 100)}
					onChange={setSaturation}
					onChangeComplete={onChangeComplete}
				/>
			</label>
			<label className="slider-label lightness">
				Lightness
				<InputRange
					maxValue={100}
					minValue={0}
					value={Math.round(hsl.l * 100)}
					onChange={setLightness}
					onChangeComplete={onChangeComplete}
				/>
			</label>
		</fieldset>
	);
};

export default HSLPicker;
