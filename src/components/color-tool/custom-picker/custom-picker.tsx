import React, { FC, useState, useEffect } from 'react';
import { CustomPicker, ChromePicker } from 'react-color';
import './custom-picker.scss';
import { useDispatch } from 'react-redux';
import { setColor } from '../../../redux/actions/colorAction';
import RGBPicker from '../../rgb-picker/rgb-picker';
import HSLPicker from '../../hsl-picker/hsl-picker';
import { push } from 'connected-react-router';

const MyColorPicker: FC<any> = (props: any) => {
	const dispatch = useDispatch();
	const [hex, setHex] = useState(props.colorInput);

	useEffect(() => {
		if (props.colorInput !== hex) {
			dispatch(setColor(hex));
			dispatch(push(`/color-tool?color=${hex.startsWith('#') ? hex.substring(1) : hex}`));
		}
	});

	const chromePickerChange = (colorObj: any) => {
		setHex(colorObj.hex);
	};

	const viewBoxStyle = {
		backgroundColor: props.colorInput
	};

	return (
		<>
			<form className="custom-picker-form">
				<ChromePicker color={props.colorInput} disableAlpha={true} onChange={chromePickerChange} onChangeComplete={chromePickerChange} />
				<RGBPicker hex={hex} onChange={setHex} onChangeComplete={setHex} />
				<HSLPicker hex={hex} onChange={setHex} onChangeComplete={setHex} />
			</form>
			<div className="viewing-box" style={viewBoxStyle}></div>
		</>
	);
};

export default CustomPicker(MyColorPicker);
