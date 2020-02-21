/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from 'react';
import './hsl-picker.scss';
import tinycolor from 'tinycolor2';
import InputRange from 'react-input-range';

interface HSLPicker {
	hex?: any;
	onChange: any;
	onChangeComplete?: any;
}

const HSLPicker: FC<HSLPicker> = (props: HSLPicker) => {
	const hsl = tinycolor(props.hex).toHsl();

	const setHue = (value: any) => {
		props.onChange(`#${tinycolor({ h: value, s: hsl.s, l: hsl.l }).toHex()}`);
	};

	const setSaturation = (value: any) => {
		props.onChange(`#${tinycolor({ h: hsl.h, s: value / 100, l: hsl.l }).toHex()}`);
	};

	const setLightness = (value: any) => {
		props.onChange(`#${tinycolor({ h: hsl.h, s: hsl.s, l: value / 100 }).toHex()}`);
	};

	const onChangeComplete = () => {
		props.onChangeComplete(`#${tinycolor({ h: hsl.h, s: hsl.s, l: hsl.l }).toHex()}`);
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
