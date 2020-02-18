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
	const [hue, setHue] = useState<any>();
	const [saturation, setSaturation] = useState<any>();
	const [lightness, setLightness] = useState<any>();

	useEffect(() => {
		const hsl = tinycolor(props.hex).toHsl();
		setHue(hsl.h);
		setSaturation(hsl.s * 100);
		setLightness(hsl.l * 100);
	}, []);

	useEffect(() => {
		if (hue && saturation && lightness) {
			props.onChange(`#${tinycolor({ h: hue, s: saturation / 100, l: lightness / 100 }).toHex()}`);
		}
	}, [hue, saturation, lightness]);

	const onChangeComplete = () => {
		props.onChangeComplete(`#${tinycolor({ h: hue, s: saturation / 100, l: lightness / 100 }).toHex()}`);
	};

	return (
		<fieldset className="slider-fieldset">
			<legend className="sr-only">HSL Sliders</legend>
			<label className="slider-label hue">
				Hue
				{hue && <InputRange maxValue={359} minValue={0} value={Math.round(hue)} onChange={setHue} onChangeComplete={onChangeComplete} />}
			</label>
			<label className="slider-label saturation">
				Saturation
				{saturation && (
					<InputRange
						maxValue={100}
						minValue={0}
						value={Math.round(saturation)}
						onChange={setSaturation}
						onChangeComplete={onChangeComplete}
					/>
				)}
			</label>
			<label className="slider-label lightness">
				Lightness
				{lightness && (
					<InputRange
						maxValue={100}
						minValue={0}
						value={Math.round(lightness)}
						onChange={setLightness}
						onChangeComplete={onChangeComplete}
					/>
				)}
			</label>
		</fieldset>
	);
};

export default HSLPicker;
