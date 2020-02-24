import React, { FC } from 'react';
import ColorBar from '../colorBar/ColorBar';
import './colorBox.scss';
import { useSelector } from 'react-redux';
import { State } from '../../redux/interfaces';

interface ColorBox {
	colors: any[];
	name: string;
}

const ColorBox: FC<ColorBox> = (props: ColorBox) => {
	const mode: string = useSelector((store: State) => store.color.mode);
	const { colors, name } = props;

	if (!colors) {
		return null;
	}

	return (
		<div className="color-box">
			<p className="box-title" id={name.replace(' ', '-') + '-swatch'} aria-label={'Swatch of ' + name + ' colors'}>
				{name}
			</p>
			<ul className="box-bar-wrapper">
				{colors.map((c: any, index: number) => {
					const showValue = mode === 'hex' ? c.color : mode === 'hsl' ? c.hsl : c.rgb;
					return <ColorBar groupName={name} hex={c.color} value={showValue} contrastColor={c.contrast} key={`${c.color}-${index}`} />;
				})}
			</ul>
		</div>
	);
};

export default ColorBox;
