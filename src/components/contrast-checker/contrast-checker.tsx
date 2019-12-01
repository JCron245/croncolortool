import React, { FC, useState } from 'react';
import './contrast-checker.scss';
import chroma from 'chroma-js';
import tinycolor from 'tinycolor2';
import RGBPicker from '../rgb-picker/rgb-picker';
import HSLPicker from '../hsl-picker/hsl-picker';

const ContrastChecker: FC = () => {
	const [backgroundValue, setBackgroundValue] = useState('#0FADED');
	const [textColorValue, setTextColorValue] = useState('#014');
	const [contrastRatio, setContrastRatio] = useState(7.06);

	const [smallAAValue, setSmallAAValue] = useState(true);
	const [largeAAValue, setLargeAAValue] = useState(true);
	const [smallAAAValue, setSmallAAAValue] = useState(true);
	const [largeAAAValue, setLargeAAAValue] = useState(true);

	const backgroundValueRGB = chroma(backgroundValue).rgb();
	const textColorValueRGB = chroma(textColorValue).rgb();
	const backgroundValueHSL = tinycolor(backgroundValue).toHsl();
	const textColorValueHSL = tinycolor(textColorValue).toHsl();

	const updateOne = (value: any) => {
		setBackgroundValue(value);
		if (chroma.valid(value) && chroma.valid(textColorValue)) {
			let tmp = chroma.contrast(value, textColorValue);
			setContrastRatio(tmp);
			wcag(value);
		}
	};

	const updateTwo = (event: any) => {
		setTextColorValue(event);
		if (chroma.valid(event) && chroma.valid(backgroundValue)) {
			let tmp = chroma.contrast(backgroundValue, event);
			setContrastRatio(tmp);
			wcag(null, event);
		}
	};

	const wcag = (background: any = null, text: any = null) => {
		setTimeout(() => {
			setSmallAAValue(tinycolor.isReadable(background || backgroundValue, text || textColorValue, { level: 'AA', size: 'small' }));
			setLargeAAValue(tinycolor.isReadable(background || backgroundValue, text || textColorValue, { level: 'AA', size: 'large' }));
			setSmallAAAValue(tinycolor.isReadable(background || backgroundValue, text || textColorValue, { level: 'AAA', size: 'small' }));
			setLargeAAAValue(tinycolor.isReadable(background || backgroundValue, text || textColorValue, { level: 'AAA', size: 'large' }));
		});
	};

	const currentStyle = {
		backgroundColor: backgroundValue,
		color: textColorValue
	};

	return (
		<div className="contrast-checker" style={currentStyle}>
			<div className="demo-section">
				<p className="summary">
					WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. <br />
					WCAG 2.1 requires a contrast ratio of at least 3:1 for graphics and user interface components (such as form input borders).
					<br />
					WCAG Level AAA requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text. <br />
					<br />
					Large text is defined as 14 point (typically 18.66px) and bold or larger, or 18 point (typically 24px) or larger.
				</p>
				<span className="text-box small">10px Text</span>
				<span className="text-box normal">16px Text</span>
				<span className="text-box large-bold">18.66px Bold Text</span>
				<span className="text-box large">24px Text</span>
			</div>
			<div className="input-section">
				<div className="results">
					<div className={'wcag-box aa ' + (smallAAValue ? 'good' : 'bad')}>
						<span>>= 4.5</span>
						<span>AA Small</span>
					</div>
					<div className={'wcag-box aa ' + (largeAAValue ? 'good' : 'bad')}>
						<span>>= 3.1</span>
						<span>AA Large</span>
					</div>
					<div className={'wcag-box aaa ' + (smallAAAValue ? 'good' : 'bad')}>
						<span>>= 7</span>
						<span>AAA Small</span>
					</div>
					<div className={'wcag-box aaa ' + (largeAAAValue ? 'good' : 'bad')}>
						<span>>= 4.5</span>
						<span>AAA Large</span>
					</div>
				</div>
				<div className="ratio">{Number(contrastRatio).toFixed(2)}</div>
				<div className="colors">
					<label className="background-choice">
						{' '}
						Background Color:
						<input
							name="color-one"
							value={backgroundValue}
							onChange={e => {
								updateOne(e.target.value);
							}}
						/>
					</label>
					<label className="text-choice">
						{' '}
						Text Color:
						<input
							name="color-two"
							value={textColorValue}
							onChange={e => {
								updateTwo(e.target.value);
							}}
						/>
					</label>
					<div>
						<RGBPicker rgb={backgroundValueRGB} onChange={updateOne} />
						<HSLPicker hsl={backgroundValueHSL} onChange={updateOne} />
					</div>
					<div>
						<RGBPicker rgb={textColorValueRGB} onChange={updateTwo} />
						<HSLPicker hsl={textColorValueHSL} onChange={updateTwo} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContrastChecker;
