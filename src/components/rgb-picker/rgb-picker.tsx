/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, memo } from 'react';
import chroma from 'chroma-js';
import './rgb-picker.scss';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

interface RGBPicker {
	hex: string;
	onChange?: any;
	onChangeComplete?: any;
}

const RGBPicker: FC<RGBPicker> = (props: RGBPicker) => {
	const rgb = chroma(props.hex).rgb();

	const setRed = (value: any) => {
		props.onChange(chroma([value, rgb[1], rgb[2]]).hex());
	};

	const setGreen = (value: any) => {
		props.onChange(chroma([rgb[0], value, rgb[2]]).hex());
	};

	const setBlue = (value: any) => {
		props.onChange(chroma([rgb[0], rgb[1], value]).hex());
	};

	const onChangeComplete = () => {
		props.onChangeComplete(chroma([rgb[0], rgb[1], rgb[2]]).hex());
	};

	return (
		<fieldset className="slider-fieldset">
			<legend className="sr-only">RGB Sliders</legend>
			<label className="slider-label red">
				Red
				<InputRange maxValue={255} minValue={0} value={rgb[0]} onChange={setRed} onChangeComplete={onChangeComplete} />
			</label>
			<label className="slider-label green">
				Green
				<InputRange maxValue={255} minValue={0} value={rgb[1]} onChange={setGreen} onChangeComplete={onChangeComplete} />
			</label>
			<label className="slider-label blue">
				Blue
				<InputRange maxValue={255} minValue={0} value={rgb[2]} onChange={setBlue} onChangeComplete={onChangeComplete} />
			</label>
		</fieldset>
	);
};

export default memo(RGBPicker);
