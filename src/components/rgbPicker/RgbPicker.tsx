/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from 'react';
import './rgbPicker.scss';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { TinyColor } from '@ctrl/tinycolor';

interface RGBPicker {
	hex: string;
	onChange?: any;
	onChangeComplete?: any;
}

const RGBPicker: FC<RGBPicker> = (props: RGBPicker) => {
	const rgb = new TinyColor(props.hex).toRgb();

	const setRed = (value: any) => {
		props.onChange(new TinyColor({ r: value, g: rgb.g, b: rgb.b }).toHexString());
	};

	const setGreen = (value: any) => {
		props.onChange(new TinyColor({ r: rgb.r, g: value, b: rgb.b }).toHexString());
	};

	const setBlue = (value: any) => {
		props.onChange(new TinyColor({ r: rgb.r, g: rgb.g, b: value }).toHexString());
	};

	const onChangeComplete = () => {
		props.onChangeComplete(new TinyColor({ r: rgb.r, g: rgb.g, b: rgb.b }).toHexString());
	};

	return (
		<fieldset className="slider-fieldset">
			<legend className="sr-only">RGB Sliders</legend>
			<label className="slider-label red">
				Red
				<InputRange maxValue={255} minValue={0} value={rgb.r} onChange={setRed} onChangeComplete={onChangeComplete} />
			</label>
			<label className="slider-label green">
				Green
				<InputRange maxValue={255} minValue={0} value={rgb.g} onChange={setGreen} onChangeComplete={onChangeComplete} />
			</label>
			<label className="slider-label blue">
				Blue
				<InputRange maxValue={255} minValue={0} value={rgb.b} onChange={setBlue} onChangeComplete={onChangeComplete} />
			</label>
		</fieldset>
	);
};

export default RGBPicker;
