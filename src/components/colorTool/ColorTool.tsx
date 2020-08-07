/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './colorTool.scss';
import { State } from '../../redux/interfaces';
import ColorBox from '../colorBox/ColorBox';
import ColorMode from '../colorMode/ColorMode';
import ColorSaver from '../colorSaver/ColorSaver';
import { ChromePicker } from 'react-color';
import RGBPicker from '../rgbPicker/RgbPicker';
import HSLPicker from '../hslPicker/HslPicker';
import { useDispatch } from 'react-redux';
import { setColor } from '../../redux/actions/colorAction';
import { push } from 'connected-react-router';
import HexBox from '../hexBox/HexBox';
import { getColors, ColorSets } from './colorToolUtils';

const ColorTool: FC = () => {
	const hex: string = useSelector((store: State) => store.color.hex);
	const mode: string = useSelector((store: State) => store.color.mode);
	const dispatch = useDispatch();
	const [colorArrays, setColorArrays] = useState<ColorSets>();

	useEffect(() => {
		setColorArrays(getColors(hex, mode));
	}, [hex, mode]);

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
					<ColorBox name="lighter" colors={colorArrays?.lighter} />
					<ColorBox name="darker" colors={colorArrays?.darker} />
					<ColorBox name="tint" colors={colorArrays?.tint} />
					<ColorBox name="shade" colors={colorArrays?.shade} />
					<ColorBox name="saturated" colors={colorArrays?.saturated} />
					<ColorBox name="desaturated" colors={colorArrays?.desaturated} />
					<ColorBox name="analogous" colors={colorArrays?.analogous} />
					<ColorBox name="complementary" colors={colorArrays?.complementary} />
					<ColorBox name="split complement" colors={colorArrays?.split} />
					<ColorBox name="triadic" colors={colorArrays?.triadic} />
					<ColorBox name="tetradic" colors={colorArrays?.tetradic} />
					<ColorBox name="pentadic" colors={colorArrays?.pentadic} />
					<ColorBox name="monochromatic" colors={colorArrays?.monochromatic} />
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
