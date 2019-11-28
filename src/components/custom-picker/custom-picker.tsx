import React, { FC } from 'react';
import { CustomPicker, ChromePicker } from 'react-color';
import './custom-picker.scss';
import chroma from 'chroma-js';
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from '../../redux/actions/colorAction';
import { State } from '../../redux/interfaces';
import tinycolor from 'tinycolor2';

const MyColorPicker: FC<any> = (props: any) => {
	const store: State = useSelector((store: State) => store);
	const dispatch = useDispatch();

	const rgb = chroma(store.hex).rgb();

	const hsl = tinycolor(store.hex).toHsl();

	const colorChange = (color: any) => {
		dispatch(setColor(color.hex));
	};

	const rgbChange = (event: any, part: string) => {
		switch (part) {
			case 'r':
				rgb[0] = event;
				break;
			case 'g':
				rgb[1] = event;
				break;
			case 'b':
				rgb[2] = event;
				break;
			default:
				break;
		}
		colorChange({ hex: chroma(rgb).hex() });
	};

	const hslChange = (event: any, part: string) => {
		switch (part) {
			case 'h':
				hsl.h = event;
				break;
			case 's':
				hsl.s = event / 100;
				break;
			case 'l':
				hsl.l = event / 100;
				break;
			default:
				break;
		}
		colorChange({ hex: tinycolor(hsl).toHex() });
	};

	return (
		<>
			<ChromePicker
				color={props.colorInput}
				disableAlpha={true}
				onChange={colorChange}
				onChangeComplete={colorChange}
			/>
			<label className="slider-label">
				R: {rgb[0]}
				<input
					type="range"
					min="0"
					max="255"
					className="slider"
					value={rgb[0]}
					onChange={e => {
						rgbChange(e.target.value, 'r');
					}}
				/>
			</label>
			<label className="slider-label">
				G: {rgb[1]}
				<input
					type="range"
					min="0"
					max="255"
					className="slider"
					value={rgb[1]}
					onChange={e => {
						rgbChange(e.target.value, 'g');
					}}
				/>
			</label>
			<label className="slider-label">
				B: {rgb[2]}
				<input
					type="range"
					min="0"
					max="255"
					className="slider"
					value={rgb[2]}
					onChange={e => {
						rgbChange(e.target.value, 'b');
					}}
				/>
			</label>
			<label className="slider-label">
				H: {Math.floor(hsl.h)}
				<input
					type="range"
					min="0"
					max="359"
					className="slider"
					value={Math.floor(hsl.h)}
					onChange={e => {
						hslChange(e.target.value, 'h');
					}}
				/>
			</label>
			<label className="slider-label">
				S: {Math.floor(hsl.s * 100)}%
				<input
					type="range"
					min="0"
					max="100"
					className="slider"
					value={Math.floor(hsl.s * 100)}
					onChange={e => {
						hslChange(e.target.value, 's');
					}}
				/>
			</label>
			<label className="slider-label">
				L: {Math.floor(hsl.l * 100)}%
				<input
					type="range"
					min="0"
					max="100"
					className="slider"
					value={Math.floor(hsl.l * 100)}
					onChange={e => {
						hslChange(e.target.value, 'l');
					}}
				/>
			</label>
			{/* Empty div for 'viewing' the color */}
			<div className="viewing-box" style={{ backgroundColor: store.hex }}></div>
		</>
	);
};

export default CustomPicker(MyColorPicker);
