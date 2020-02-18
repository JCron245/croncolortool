import React, { FC } from 'react';
import ColorBar from './color-bar';
import './color-box.scss';
import chroma from 'chroma-js';
import { findContrastingColor } from '../../../utils/find-contrast';
import tinycolor from 'tinycolor2';

interface ColorBox {
	colors: string[];
	name: string;
	show: string;
}

export const ColorBox: FC<ColorBox> = (props: ColorBox) => {
	const showValue = (color: any) => {
		switch (props.show) {
			case 'hsl':
				let hsl = tinycolor(color).toHsl();
				return `${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%`;
			case 'hex':
				return color;
			default:
				return chroma(color)
					.rgb()
					.toString();
		}
	};

	return (
		<div className="color-box">
			<p className="box-title" id={props.name.replace(' ', '-') + '-swatch'} aria-label={'Swatch of ' + props.name + ' colors'}>
				{props.name}
			</p>
			<ul className="box-bar-wrapper">
				{props.colors.map((color: string, index: number) => {
					return (
						<ColorBar
							groupName={props.name}
							hex={color}
							value={showValue(color)}
							contrastColor={findContrastingColor(color)}
							key={`${color}-${index}`}
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default ColorBox;
