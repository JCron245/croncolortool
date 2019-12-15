import React, { FC, useState } from 'react';
import './contrast-checker.scss';
import chroma from 'chroma-js';
import tinycolor from 'tinycolor2';
import RGBPicker from '../rgb-picker/rgb-picker';
import HSLPicker from '../hsl-picker/hsl-picker';
import ContrastDemo from './contrast-demo/contrast-demo';
import ContrastResults from './contrast-results/contrast-results';

const ContrastChecker: FC = () => {
	const [backgroundValue, setBackgroundValue] = useState('#CCC');
	const [backgroundValueRGB, setBackgroundRGBValue] = useState(chroma('#CCC').rgb());
	const [backgroundValueHSL, setBackgroundHSLValue] = useState(tinycolor('#CCC').toHsl());
	const [textColorValue, setTextColorValue] = useState('#333');
	const [textColorValueRGB, setTextColorRGBValue] = useState(chroma('#333').rgb());
	const [textColorValueHSL, setTextColorHSLValue] = useState(tinycolor('#333').toHsl());
	const [contrastRatio, setContrastRatio] = useState(chroma.contrast('#CCC', '#333'));

	const [smallAAValue, setSmallAAValue] = useState(true);
	const [largeAAValue, setLargeAAValue] = useState(true);
	const [smallAAAValue, setSmallAAAValue] = useState(true);
	const [largeAAAValue, setLargeAAAValue] = useState(true);

	const updateBackgroundColor = (value: any) => {
		if (chroma.valid(value) && chroma.valid(textColorValue)) {
			if (value.length > 2 && value.charAt(0) !== '#') {
				value = `#${value}`;
			}
			setBackgroundValue(value);
			setBackgroundHSLValue(tinycolor(value).toHsl());
			setBackgroundRGBValue(chroma(value).rgb());
			let tmp = chroma.contrast(value, textColorValue);
			setContrastRatio(tmp);
			wcag(value);
		} else {
			setBackgroundValue(value);
		}
	};

	const updateTextColor = (event: any) => {
		if (chroma.valid(event) && chroma.valid(backgroundValue)) {
			if (event.length > 2 && event.charAt(0) !== '#') {
				event = `#${event}`;
			}
			setTextColorValue(event);
			setTextColorHSLValue(tinycolor(event).toHsl());
			setTextColorRGBValue(chroma(event).rgb());
			let tmp = chroma.contrast(backgroundValue, event);
			setContrastRatio(tmp);
			wcag(null, event);
		} else {
			setTextColorValue(event);
		}
	};

	const wcag = (background: string | null = null, text: string | null = null) => {
		setTimeout(() => {
			setSmallAAValue(tinycolor.isReadable(background || backgroundValue, text || textColorValue, { level: 'AA', size: 'small' }));
			setSmallAAAValue(tinycolor.isReadable(background || backgroundValue, text || textColorValue, { level: 'AAA', size: 'small' }));
			setLargeAAValue(tinycolor.isReadable(background || backgroundValue, text || textColorValue, { level: 'AA', size: 'large' }));
			setLargeAAAValue(tinycolor.isReadable(background || backgroundValue, text || textColorValue, { level: 'AAA', size: 'large' }));
		});
	};

	const currentStyle = {
		backgroundColor: backgroundValue,
		color: textColorValue
	};

	return (
		<div className="contrast-checker" style={currentStyle}>
			<ContrastDemo textColor={textColorValue} backgroundColor={backgroundValue} />
			<div className="input-section">
				<ContrastResults
					contrastRatio={contrastRatio}
					smallAA={smallAAValue}
					smallAAA={smallAAAValue}
					largeAA={largeAAValue}
					largeAAA={largeAAAValue}
				/>
				<div className="colors">
					<form className="background-choice">
						<div className="hex-box-wrapper">
							<label className="hex-box-label" htmlFor="bg-color">
								Background Color:
							</label>
							<input
								id="bg-color"
								name="color-one"
								className="hex-box-input"
								value={backgroundValue}
								onChange={e => {
									updateBackgroundColor(e.target.value);
								}}
							/>
							<div className="color-display-box" style={{ backgroundColor: backgroundValue }}></div>
						</div>
						<RGBPicker rgb={backgroundValueRGB} onChange={updateBackgroundColor} />
						<HSLPicker hsl={backgroundValueHSL} onChange={updateBackgroundColor} />
					</form>
					<form className="text-choice">
						<div className="hex-box-wrapper">
							<label className="hex-box-label" htmlFor="text-color">
								Text Color:
							</label>
							<input
								id="text-color"
								name="color-two"
								className="hex-box-input"
								value={textColorValue}
								onChange={e => {
									updateTextColor(e.target.value);
								}}
							/>
							<div className="color-display-box" style={{ backgroundColor: textColorValue }}></div>
						</div>
						<RGBPicker rgb={textColorValueRGB} onChange={updateTextColor} />
						<HSLPicker hsl={textColorValueHSL} onChange={updateTextColor} />
					</form>
				</div>
			</div>
		</div>
	);
};

export default ContrastChecker;
