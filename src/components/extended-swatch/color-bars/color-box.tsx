import React, { FC } from 'react';
import ColorBar from './color-bar';
import './color-box.scss';
import chroma from 'chroma-js';
import { findContrastingColor } from '../../../utils/color-utils';
import tinycolor from 'tinycolor2';

interface ColorBox {
	colors: string[];
	name: string;
	show: string;
}

export const ColorBox: FC<ColorBox> = (props: ColorBox) => {
	const showValue = (color: any) => {
		if (props.show === 'hsl') {
			let hsl = tinycolor(color).toHsl();
			return `${Math.floor(hsl.h)}, ${Math.floor(hsl.s * 100)}%, ${Math.floor(hsl.l * 100)}%`;
		}
		return props.show === 'hex'
			? color
			: chroma(color)
					.rgb()
					.toString();
	};

	return (
		<div className="color-box">
			<p className="box-title">{props.name}</p>
			<div className="box-bar-wrapper">
				{props.colors.map((color: string, index: number) => {
					const value = showValue(color);
					const contrast = findContrastingColor(color);
					return <ColorBar groupName={props.name} hex={color} value={value} contrastColor={contrast} key={index} />;
				})}
			</div>
		</div>
	);
};

export default ColorBox;
