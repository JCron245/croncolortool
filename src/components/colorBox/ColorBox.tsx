import React, { FC } from 'react';
import ColorBar from '../colorBar/ColorBar';
import './colorBox.scss';
import { ColorObject } from '../colorTool/colorToolUtils';

interface ColorBox {
	colors?: ColorObject[];
	name: string;
}

const ColorBox: FC<ColorBox> = (props: ColorBox) => {
	const { colors, name } = props;
	const colorBars = colors?.map((c: any, index: number) => {
		return <ColorBar groupName={name} hex={c.color} value={c.showValue} contrastColor={c.contrast} key={`${c.color}-${name}-${index}`} />;
	});

	return (
		<div className="color-box">
			<p className="box-title" id={name.replace(' ', '-') + '-swatch'} aria-label={'Swatch of ' + name + ' colors'}>
				{name}
			</p>
			<ul className="box-bar-wrapper">{colorBars}</ul>
		</div>
	);
};

export default ColorBox;
