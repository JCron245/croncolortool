/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, memo, useState, useEffect, useCallback } from 'react';
import './hexBox.scss';
import { TinyColor } from '@ctrl/tinycolor';

interface HexBox {
	hex: string;
	display?: boolean;
	id?: string;
	label?: string;
	onChange: any;
	containerStyle?: any;
	labelStyle?: any;
	inputStyle?: any;
}

const HexBox: FC<HexBox> = (props: HexBox) => {
	const [color, setColor] = useState(props.hex);
	const [label] = useState(`${props.label ? props.label : 'Hex'}`);
	const [id] = useState(props.id ? `${props.id}` : `${label}${Math.random().toFixed(3).replace('.', '')}`);
	const [width] = useState(`${label.length + 4}ch`);

	useEffect(() => {
		if (props.hex !== color) {
			setColor(props.hex);
		}
	}, [props.hex]);

	const update = useCallback((e: any) => {
		if (e.target.value !== props.hex && new TinyColor(e.target.value).isValid) {
			props.onChange(e.target.value);
		} else {
			setColor(e.target.value);
		}
	}, []);

	return (
		<div className="hex-box-wrapper" style={{ ...props.containerStyle }}>
			<label className="hex-box-label" htmlFor={id} style={{ width, ...props.labelStyle }}>
				{label}
			</label>
			<input
				spellCheck={false}
				autoComplete="off"
				className="hex-box-input"
				id={id}
				name="color-one"
				onChange={update}
				style={{ ...props.inputStyle }}
				value={color}
			/>
			{props.display && <div className="color-display-box" style={{ backgroundColor: color }}></div>}
		</div>
	);
};

export default memo(HexBox);
