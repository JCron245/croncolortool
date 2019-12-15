import React, { FC } from 'react';
import { CustomPicker, ChromePicker } from 'react-color';
import './custom-picker.scss';
import chroma from 'chroma-js';
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from '../../../redux/actions/colorAction';
import { State } from '../../../redux/interfaces';
import tinycolor from 'tinycolor2';
import RGBPicker from '../../rgb-picker/rgb-picker';
import HSLPicker from '../../hsl-picker/hsl-picker';
import { push } from 'connected-react-router';

const MyColorPicker: FC<any> = (props: any) => {
	const storeColor: State = useSelector((store: State) => store);
	const dispatch = useDispatch();

	const rgb = chroma(storeColor.hex).rgb();

	const hsl = tinycolor(storeColor.hex).toHsl();

	const colorChange = (color: any) => {
		dispatch(push(`/color-tool/?color=${color.hex}`));
		dispatch(setColor(color.hex));
	};

	const rgbChange = (hex: string) => {
		colorChange({ hex });
	};

	const hslChange = (hex: string) => {
		colorChange({ hex });
	};

	return (
		<>
			<form>
				<ChromePicker color={props.colorInput} disableAlpha={true} onChange={colorChange} onChangeComplete={colorChange} />
				<RGBPicker rgb={rgb} onChange={rgbChange} />
				<HSLPicker hsl={hsl} onChange={hslChange} />
				{/* Empty div for 'viewing' the color */}
			</form>
			<div className="viewing-box" style={{ backgroundColor: storeColor.hex }}></div>
		</>
	);
};

export default CustomPicker(MyColorPicker);
