import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './color-tool.scss';
import { State } from '../../redux/interfaces';
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
import { Helmet } from 'react-helmet';

const ExtendedSwatch: FC = () => {
	const hex: string = useSelector((store: State) => store.color.hex);
	const [lightArray, setLightArray] = useState();
	const [darkArray, setDarkArray] = useState();
	const [saturationArray, setSaturationArray] = useState();
	const [desaturationArray, setDesaturationArray] = useState();
	const [analogousArray, setAnalogousArray] = useState();
	const [complementArray, setComplementArray] = useState();
	const [splitComplementArray, setSplitComplementArray] = useState();
	const [triadArray, setTriadArray] = useState();
	const [tetradArray, setTetradArray] = useState();
	const [monochromaticArray, setMonochromaticArray] = useState();

	useEffect(() => {
		const color = hex;
		setLightArray(createLightArray(color));
		setDarkArray(createDarkArray(color));
		setSaturationArray(createSaturationArray(color));
		setDesaturationArray(createDesaturationArray(color));
		setAnalogousArray(createAnalogousArray(color));
		setComplementArray(createComplementArray(color));
		setSplitComplementArray(createSplitComplementArray(color));
		setTriadArray(createTriadArray(color));
		setTetradArray(createTetradArray(color));
		setMonochromaticArray(createMonochromaticArray(color));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hex]);

	return (
		<div className="extended-swatch">
			<Helmet>
				<title>Color Manipulation Tool</title>
			</Helmet>
			<h1 className="sr-only">Color Tool</h1>
			{/* Color Picker Box */}
			<section className="picker-box">
				<MyColorPicker colorInput={hex} />
			</section>
			{/* Box of various color information - shades etc */}
			<section className="info-box">
				<div className="color-box-grid">
					<ColorBox name="lighter" colors={lightArray} />
					<ColorBox name="darker" colors={darkArray} />
					<ColorBox name="saturated" colors={saturationArray} />
					<ColorBox name="desaturated" colors={desaturationArray} />
					<ColorBox name="analogous" colors={analogousArray} />
					<ColorBox name="complementary" colors={complementArray} />
					<ColorBox name="split complement" colors={splitComplementArray} />
					<ColorBox name="triadic" colors={triadArray} />
					<ColorBox name="tetradic" colors={tetradArray} />
					<ColorBox name="monochromatic" colors={monochromaticArray} />
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
