import React, { FC } from "react";
import { CustomPicker, ChromePicker } from "react-color";
import "./custom-picker.scss";
import { StateCurrentColor } from "../state";
import chroma from "chroma-js";

var { EditableInput } = require("react-color/lib/components/common");

interface MyColorPicker {
	colorInput: StateCurrentColor;
	onChange: any;
}

const MyColorPicker: FC<MyColorPicker> = (props: MyColorPicker) => {
	const colorChange = (color: any) => {
		props.onChange(color);
	};

	const inputChange = (event: any) => {
		if (!!Number(event.r) && Number(event.r) >= 0 && Number(event.r) <= 255) {
			let newRGBChange = props.colorInput.rgbArray;
			newRGBChange[0] = Number(event.r);
			props.onChange(chroma(newRGBChange).hex());
		} else if (
			!!Number(event.g) &&
			Number(event.g) >= 0 &&
			Number(event.g) <= 255
		) {
			let newRGBChange = props.colorInput.rgbArray;
			newRGBChange[1] = Number(event.g);
			props.onChange(chroma(newRGBChange).hex());
		} else if (
			!!Number(event.b) &&
			Number(event.b) >= 0 &&
			Number(event.b) <= 255
		) {
			let newRGBChange = props.colorInput.rgbArray;
			newRGBChange[2] = Number(event.b);
			props.onChange(chroma(newRGBChange).hex());
		} else if (
			!!Number(event.h) &&
			Number(event.h) >= 0 &&
			Number(event.h) <= 100
		) {
			const hsl = props.colorInput.hslArray;
			props.onChange(
				chroma(Number(event.h), Number(hsl[1]), Number(hsl[2]), "hsl").hex()
			);
		} else if (
			!!Number(event.s) &&
			Number(event.s) >= 0 &&
			Number(event.s) <= 1.0
		) {
			const hsl = props.colorInput.hslArray;
			props.onChange(
				chroma(Number(hsl[0]), Number(event.s), Number(hsl[2]), "hsl").hex()
			);
		} else if (
			!!Number(event.l) &&
			Number(event.l) >= 0 &&
			Number(event.l) <= 1.0
		) {
			const hsl = props.colorInput.hslArray;
			props.onChange(
				chroma(Number(hsl[0]), Number(hsl[1]), Number(event.l), "hsl").hex()
			);
		}
	};

	return (
		<>
			<ChromePicker
				color={props.colorInput.hexString}
				disableAlpha={true}
				onChange={colorChange}
				onChangeComplete={props.onChange}
			/>
			<div className="editable-section">
				<EditableInput
					label="r"
					value={props.colorInput.rgbArray[0]}
					onChange={inputChange}
				/>
				<EditableInput
					label="g"
					value={props.colorInput.rgbArray[1]}
					onChange={inputChange}
				/>
				<EditableInput
					label="b"
					value={props.colorInput.rgbArray[2]}
					onChange={inputChange}
				/>
			</div>
			<div className="editable-section">
				<EditableInput
					label="h"
					value={props.colorInput.hslArray[0]}
					onChange={inputChange}
				/>
				<EditableInput
					label="s"
					value={props.colorInput.hslArray[1]}
					onChange={inputChange}
				/>
				<EditableInput
					label="l"
					value={props.colorInput.hslArray[2]}
					onChange={inputChange}
				/>
			</div>
		</>
	);
};

export default CustomPicker(MyColorPicker);
