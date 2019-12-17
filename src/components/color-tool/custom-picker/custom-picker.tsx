import React, { FC } from 'react';
import { CustomPicker, ChromePicker } from 'react-color';
import './custom-picker.scss';
import chroma from 'chroma-js';
import { useDispatch } from 'react-redux';
import { setColor } from '../../../redux/actions/colorAction';
import tinycolor from 'tinycolor2';
import RGBPicker from '../../rgb-picker/rgb-picker';
import HSLPicker from '../../hsl-picker/hsl-picker';
import { push } from 'connected-react-router';

const MyColorPicker: FC<any> = (props: any) => {
	const dispatch = useDispatch();

	const rgb = chroma(props.colorInput).rgb();

	const hsl = tinycolor(props.colorInput).toHsl();

	const colorChange = (color: any) => {
		dispatch(setColor(color.hex));
		// setQuery(color.hex.substring(1));
	};

	const setQuery = (color: any) => {
		if (color.startsWith('#')) {
			color = color.substring(1);
		}
		dispatch(push(`/color-tool?color=${color}`));
	};

	const rgbChange = (hex: string) => {
		colorChange({ hex });
	};

	const hslChange = (hex: string) => {
		colorChange({ hex });
	};

	const viewBoxStyle = {
		backgroundColor: props.colorInput
	};

	return (
		<>
			<form className="custom-picker-form">
				<ChromePicker color={props.colorInput} disableAlpha={true} onChange={colorChange} onChangeComplete={e => setQuery(e.hex)} />
				<RGBPicker rgb={rgb} onChange={rgbChange} onChangeComplete={setQuery} />
				<HSLPicker hsl={hsl} onChange={hslChange} onChangeComplete={setQuery} />
				{/* Empty div for 'viewing' the color */}
			</form>
			<div className="viewing-box" style={viewBoxStyle}></div>
		</>
	);
};

export default CustomPicker(MyColorPicker);
