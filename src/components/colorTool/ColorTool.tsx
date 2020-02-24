import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './colorTool.scss';
import { State } from '../../redux/interfaces';
import ColorBox from '../colorBox/ColorBox';
import * as Utils from './colorToolUtils';
import ColorMode from '../colorMode/ColorMode';
import ColorSaver from '../colorSaver/ColorSaver';
import { Helmet } from 'react-helmet';
import { ChromePicker } from 'react-color';
import RGBPicker from '../rgbPicker/RgbPicker';
import HSLPicker from '../hslPicker/HslPicker';
import { useDispatch } from 'react-redux';
import { setColor } from '../../redux/actions/colorAction';
import { push } from 'connected-react-router';
import HexBox from '../hexBox/HexBox';

const ColorTool: FC = () => {
	const hex: string = useSelector((store: State) => store.color.hex);
	const dispatch = useDispatch();
	const [lightArray, setLightArray] = useState();
	const [darkArray, setDarkArray] = useState();
	const [tintArray, setTintArray] = useState();
	const [shadeArray, setShadeArray] = useState();
	const [saturationArray, setSaturationArray] = useState();
	const [desaturationArray, setDesaturationArray] = useState();
	const [analogousArray, setAnalogousArray] = useState();
	const [complementArray, setComplementArray] = useState();
	const [splitComplementArray, setSplitComplementArray] = useState();
	const [triadArray, setTriadArray] = useState();
	const [tetradArray, setTetradArray] = useState();
	const [pentadArray, setPentadArray] = useState();
	const [monochromaticArray, setMonochromaticArray] = useState();

	useEffect(() => {
		setLightArray(Utils.createLightArray(hex));
		setDarkArray(Utils.createDarkArray(hex));
		setTintArray(Utils.createTintArray(hex));
		setShadeArray(Utils.createShadeArray(hex));
		setSaturationArray(Utils.createSaturationArray(hex));
		setDesaturationArray(Utils.createDesaturationArray(hex));
		setAnalogousArray(Utils.createAnalogousArray(hex));
		setComplementArray(Utils.createComplementArray(hex));
		setSplitComplementArray(Utils.createSplitComplementArray(hex));
		setTriadArray(Utils.createTriadArray(hex));
		setTetradArray(Utils.createTetradArray(hex));
		setPentadArray(Utils.createPentadArray(hex));
		setMonochromaticArray(Utils.createMonochromaticArray(hex));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hex]);

	const colorUpdate = (value: string, complete: boolean = false) => {
		if (value !== hex) {
			dispatch(setColor(value));
		}
		if (complete) {
			dispatch(push(`/color-tool?color=${value.substring(1)}`));
		}
	};

	const colorUpdateComplete = (value: string) => colorUpdate(value, true);

	const chromePickerChange = (colorObj: any) => colorUpdate(colorObj.hex);

	const chromePickerChangeComplete = (colorObj: any) => colorUpdate(colorObj.hex, true);

	return (
		<div className="swatch">
			<Helmet>
				<title>Color Manipulation Tool</title>
			</Helmet>
			<h1 className="sr-only">Color Tool</h1>
			{/* Color Picker Box */}
			<section className="picker-box">
				<form className="custom-picker-form">
					<ChromePicker color={hex} disableAlpha={true} onChange={chromePickerChange} onChangeComplete={chromePickerChangeComplete} />
					<HexBox hex={hex} onChange={colorUpdate} />
					<RGBPicker hex={hex} onChange={colorUpdate} onChangeComplete={colorUpdateComplete} />
					<HSLPicker hex={hex} onChange={colorUpdate} onChangeComplete={colorUpdateComplete} />
				</form>
				<div className="viewing-box" style={{ backgroundColor: hex }}></div>
			</section>
			{/* Box of various color information - shades etc */}
			<section className="info-box">
				<div className="color-box-grid">
					<ColorBox name="lighter" colors={lightArray} />
					<ColorBox name="darker" colors={darkArray} />
					<ColorBox name="tint" colors={tintArray} />
					<ColorBox name="shade" colors={shadeArray} />
					<ColorBox name="saturated" colors={saturationArray} />
					<ColorBox name="desaturated" colors={desaturationArray} />
					<ColorBox name="analogous" colors={analogousArray} />
					<ColorBox name="complementary" colors={complementArray} />
					<ColorBox name="split complement" colors={splitComplementArray} />
					<ColorBox name="triadic" colors={triadArray} />
					<ColorBox name="tetradic" colors={tetradArray} />
					<ColorBox name="pentadic" colors={pentadArray} />
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

export default ColorTool;
