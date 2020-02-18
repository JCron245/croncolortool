/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
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
	const [red, setRed] = useState<any>(1);
	const [green, setGreen] = useState<any>(1);
	const [blue, setBlue] = useState<any>(1);

	useEffect(() => {
		const rgb = chroma(props.hex).rgb();
		setRed(rgb[0]);
		setGreen(rgb[1]);
		setBlue(rgb[2]);
	}, []);

	useEffect(() => {
		props.onChange(chroma([red, green, blue]).hex());
	}, [red, green, blue]);

	const onChangeComplete = () => {
		props.onChangeComplete(chroma([red, green, blue]).hex());
	};

	return (
		<fieldset className="slider-fieldset">
			<legend className="sr-only">RGB Sliders</legend>
			<label className="slider-label red">
				Red
				<InputRange maxValue={255} minValue={0} value={red} onChange={setRed} onChangeComplete={onChangeComplete} />
			</label>
			<label className="slider-label green">
				Green
				<InputRange maxValue={255} minValue={0} value={green} onChange={setGreen} onChangeComplete={onChangeComplete} />
			</label>
			<label className="slider-label blue">
				Blue
				<InputRange maxValue={255} minValue={0} value={blue} onChange={setBlue} onChangeComplete={onChangeComplete} />
			</label>
		</fieldset>
	);
};

export default RGBPicker;
