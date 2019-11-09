import React, { FC } from 'react';
import { CustomPicker, ChromePicker } from 'react-color';
import './custom-picker.scss';
import chroma from 'chroma-js';
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from '../../redux/actions/colorAction';
import { State } from '../../redux/interfaces';
import { EditableInput } from 'react-color/lib/components/common';

const MyColorPicker: FC<any> = (props: any) => {
	const store: State = useSelector((store: State) => store);
	const dispatch = useDispatch();

	const rgb = chroma(store.hex).rgb();

	const colorChange = (color: any) => {
		dispatch(setColor(color.hex));
	};

	const rgbChange = (event: any) => {
		let newRgb = rgb;
		if (event.r && event.r >= 0 && event.r <= 255) {
			newRgb[0] = Number(event.r);
		} else if (event.g && event.g >= 0 && event.g <= 255) {
			newRgb[1] = Number(event.g);
		} else if (event.b && event.b >= 0 && event.b <= 255) {
			newRgb[2] = Number(event.b);
		} else {
			return;
		}
		colorChange({ hex: chroma(newRgb).hex() });
	};

	return (
		<>
			<ChromePicker
				color={props.colorInput}
				disableAlpha={true}
				onChange={colorChange}
				onChangeComplete={colorChange}
			/>
			<div className="editable-section">
				<EditableInput label="r" value={rgb[0]} onChange={rgbChange} />
				<EditableInput label="g" value={rgb[1]} onChange={rgbChange} />
				<EditableInput label="b" value={rgb[2]} onChange={rgbChange} />
			</div>
		</>
	);
};

export default CustomPicker(MyColorPicker);
