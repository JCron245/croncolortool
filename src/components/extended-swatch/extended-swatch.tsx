import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import './extended-swatch.scss';
import { State } from '../../redux/interfaces';
import { ColorBox } from './color-bars/color-box';
import MyColorPicker from '../custom-picker/custom-picker';
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
} from '../../utils/color-utils';
import { ColorMode } from '../color-controls/color-mode';
import ColorSaver from '../color-controls/color-saver';

const ExtendedSwatch: FC = () => {
	const store: State = useSelector((store: State) => store);

	return (
		<div className="extended-swatch">
			{/* Color Picker Box */}
			<div className="picker-box">
				<MyColorPicker colorInput={store.hex} />
			</div>
			{/* Empty div for 'viewing' the color */}
			<div className="viewing-box" style={{ backgroundColor: store.hex }}></div>
			{/* Box of various color information - shades etc */}
			<div className="info-box">
				<ColorMode />
				<ColorSaver color={store.hex} contrastColor={store.contrastColor} />
				<div className="color-box-grid">
					<ColorBox
						name="lighter"
						show={store.mode}
						colors={createLightArray(store.hex)}
					/>
					<ColorBox
						name="darker"
						show={store.mode}
						colors={createDarkArray(store.hex)}
					/>
					<ColorBox
						name="saturated"
						show={store.mode}
						colors={createSaturationArray(store.hex)}
					/>
					<ColorBox
						name="desaturated"
						show={store.mode}
						colors={createDesaturationArray(store.hex)}
					/>
					<ColorBox
						name="analgous"
						show={store.mode}
						colors={createAnalogousArray(store.hex)}
					/>
					<ColorBox
						name="complementary"
						show={store.mode}
						colors={createComplementArray(store.hex)}
					/>
					<ColorBox
						name="split complement"
						show={store.mode}
						colors={createSplitComplementArray(store.hex)}
					/>
					<ColorBox
						name="triadic"
						show={store.mode}
						colors={createTriadArray(store.hex)}
					/>
					<ColorBox
						name="tetradic"
						show={store.mode}
						colors={createTetradArray(store.hex)}
					/>
					<ColorBox
						name="monochromatic"
						show={store.mode}
						colors={createMonochromaticArray(store.hex)}
					/>
				</div>
			</div>
		</div>
	);
};

export default ExtendedSwatch;
