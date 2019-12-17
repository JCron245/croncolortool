import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import './color-tool.scss';
import { State, Color } from '../../redux/interfaces';
import { ColorBox } from './color-bars/color-box';
import MyColorPicker from './custom-picker/custom-picker';
import {
	createLightArray,
	createDarkArray,
	createSaturationArray,
	createDesaturationArray,
	createComplementArray,
	createSplitComplementArray,
	createTriadArray,
	createTetradArray,
	createMonochromaticArray,
	createAnalogousArray
} from './color-tool-utils';
import { ColorMode } from '../color-controls/color-mode';
import ColorSaver from '../color-controls/color-saver';

const ExtendedSwatch: FC = () => {
	const store: Color = useSelector((store: State) => store.color);

	return (
		<div className="extended-swatch">
			<h1 className="sr-only">Color Tool</h1>
			{/* Color Picker Box */}
			<section className="picker-box">
				<MyColorPicker colorInput={store.hex} />
			</section>
			{/* Box of various color information - shades etc */}
			<section className="info-box">
				<div className="color-box-grid">
					<ColorBox key="lighter" name="lighter" show={store.mode} colors={createLightArray(store.hex)} />
					<ColorBox key="darker" name="darker" show={store.mode} colors={createDarkArray(store.hex)} />
					<ColorBox key="saturated" name="saturated" show={store.mode} colors={createSaturationArray(store.hex)} />
					<ColorBox key="desaturated" name="desaturated" show={store.mode} colors={createDesaturationArray(store.hex)} />
					<ColorBox key="analogous" name="analogous" show={store.mode} colors={createAnalogousArray(store.hex)} />
					<ColorBox key="complementary" name="complementary" show={store.mode} colors={createComplementArray(store.hex)} />
					<ColorBox key="split" name="split complement" show={store.mode} colors={createSplitComplementArray(store.hex)} />
					<ColorBox key="triadic" name="triadic" show={store.mode} colors={createTriadArray(store.hex)} />
					<ColorBox key="tetradic" name="tetradic" show={store.mode} colors={createTetradArray(store.hex)} />
					<ColorBox key="monochromatic" name="monochromatic" show={store.mode} colors={createMonochromaticArray(store.hex)} />
				</div>
				<div className="controls">
					<ColorMode />
					<ColorSaver />
				</div>
			</section>
		</div>
	);
};

export default ExtendedSwatch;
