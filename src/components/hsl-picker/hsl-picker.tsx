/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import './hsl-picker.scss';
import tinycolor from 'tinycolor2';
import InputRange from 'react-input-range';

interface HSLPicker {
	hex?: any;
	onChange: any;
	onChangeComplete?: any;
}

const HSLPicker: FC<HSLPicker> = (props: HSLPicker) => {
	const [hue, setHue] = useState<any>(1);
	const [saturation, setSaturation] = useState<any>(1);
	const [lightness, setLightness] = useState<any>(1);

	useEffect(() => {
		const hsl = tinycolor(props.hex).toHsl();
		setHue(Math.round(hsl.h));
		setSaturation(Math.round(hsl.s * 100));
		setLightness(Math.round(hsl.l * 100));
	}, []);

	useEffect(() => {
		props.onChange(`#${tinycolor({ h: hue, s: saturation / 100, l: lightness / 100 }).toHex()}`);
	}, [hue, saturation, lightness]);

	const onChangeComplete = () => {
		props.onChangeComplete(`#${tinycolor({ h: hue, s: saturation / 100, l: lightness / 100 }).toHex()}`);
	};

	return (
		<fieldset className="slider-fieldset">
			<legend className="sr-only">HSL Sliders</legend>
			<label className="slider-label hue">
				Hue
				<InputRange maxValue={359} minValue={0} value={hue} onChange={setHue} onChangeComplete={onChangeComplete} />
			</label>
			<label className="slider-label saturation">
				Saturation
				<InputRange maxValue={100} minValue={0} value={saturation} onChange={setSaturation} onChangeComplete={onChangeComplete} />
			</label>
			<label className="slider-label lightness">
				Lightness
				<InputRange maxValue={100} minValue={0} value={lightness} onChange={setLightness} onChangeComplete={onChangeComplete} />
			</label>
		</fieldset>
	);
};

export default HSLPicker;
