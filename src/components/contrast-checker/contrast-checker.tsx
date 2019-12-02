import React, { FC, useState } from 'react';
import './contrast-checker.scss';
import chroma from 'chroma-js';
import tinycolor from 'tinycolor2';
import RGBPicker from '../rgb-picker/rgb-picker';
import HSLPicker from '../hsl-picker/hsl-picker';
import ReactTooltip from 'react-tooltip';

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
		setBackgroundValue(value);
		if (chroma.valid(value) && chroma.valid(textColorValue)) {
			setBackgroundHSLValue(tinycolor(value).toHsl());
			setBackgroundRGBValue(chroma(value).rgb());
			let tmp = chroma.contrast(value, textColorValue);
			setContrastRatio(tmp);
			wcag(value);
		}
	};

	const updateTextColor = (event: any) => {
		setTextColorValue(event);
		if (chroma.valid(event) && chroma.valid(backgroundValue)) {
			setTextColorHSLValue(tinycolor(event).toHsl());
			setTextColorRGBValue(chroma(event).rgb());
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
			<ReactTooltip id="wcag143" type="light" className="tooltip">
				<p className="tooltip-title">1.4.3 Contrast (Minimum)</p>
				The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following:
				<ul>
					<li>Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;</li>
					<li>
						Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not
						visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.
					</li>
					<li>Logotypes: Text that is part of a logo or brand name has no minimum contrast requirement.</li>
				</ul>
			</ReactTooltip>
			<ReactTooltip id="wcag1411" type="light" className="tooltip">
				<p className="tooltip-title">1.4.11 Non-text Contrast</p>
				The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):
				<ul>
					<li>
						User Interface Components: Visual information required to identify user interface components and states, except for inactive
						components or where the appearance of the component is determined by the user agent and not modified by the author;
					</li>
					<li>
						Graphical Objects: Parts of graphics required to understand the content, except when a particular presentation of graphics is
						essential to the information being conveyed.
					</li>
				</ul>
			</ReactTooltip>
			<ReactTooltip id="wcag146" type="light" className="tooltip">
				<p className="tooltip-title">1.4.6 Contrast (Enhanced)</p>
				The visual presentation of text and images of text has a contrast ratio of at least 7:1, except for the following:
				<ul>
					<li>Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 4.5:1;</li>
					<li>
						Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not
						visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.
					</li>
					<li>Logotypes Text that is part of a logo or brand name has no contrast requirement.</li>
				</ul>
			</ReactTooltip>
			<div className="demo-section">
				<section className="summary">
					<p>
						Contrast and color use are vital to accessibility. Users, including users with visual disabilities, must be able to perceive
						content on the page. For example Color blindness affects approximately 1 in 12 men (8%) and 1 in 200 women in the world. So a
						proper amount of contrast must be provided on web pages to ensure it is readable by all users.
					</p>
					<p>
						<button className="tooltip-toggle" data-tip data-for="wcag143">
							WCAG 2.0 1.4.3 (AA)
						</button>
						requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.
					</p>
					<p>
						<button className="tooltip-toggle" data-tip data-for="wcag1411">
							WCAG 2.1 1.4.11 Non-text Contrast (AA)
						</button>
						requires a contrast ratio of at least 3:1 for graphics and user interface components (such as form input borders).
					</p>
					<p>
						<button className="tooltip-toggle" data-tip data-for="wcag146">
							WCAG 2.0 1.4.6 Contrast (Enhanced) (AAA)
						</button>
						requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.
					</p>
					<p>Large text is defined as 14 point+ (typically 18.66px) and bold, or 18 point+ (typically 24px).</p>
				</section>
				<span className="text-box small">10px Text</span>
				<span className="text-box normal">16px Text</span>
				<span className="text-box large-bold">18.66px Bold Text</span>
				<span className="text-box large">24px Text</span>
			</div>
			<div className="input-section">
				<div className="results">
					<div className={'wcag-box aa ' + (smallAAValue ? 'good' : 'bad')}>
						<span>>= 4.5</span>
						<span>AA Small Text</span>
					</div>
					<div className={'wcag-box aa ' + (largeAAValue ? 'good' : 'bad')}>
						<span>>= 3.1</span>
						<span>AA Large Text</span>
					</div>
					<div className={'wcag-box aaa ' + (smallAAAValue ? 'good' : 'bad')}>
						<span>>= 7</span>
						<span>AAA Small Text</span>
					</div>
					<div className={'wcag-box aaa ' + (largeAAAValue ? 'good' : 'bad')}>
						<span>>= 4.5</span>
						<span>AAA Large Text</span>
					</div>
				</div>
				<div className="ratio">Contrast Ratio: {Number(contrastRatio).toFixed(2)}</div>
				<div className="colors">
					<label className="background-choice">
						{' '}
						Background Color:
						<input
							name="color-one"
							value={backgroundValue}
							onChange={e => {
								updateBackgroundColor(e.target.value);
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
								updateTextColor(e.target.value);
							}}
						/>
					</label>
					<div>
						<RGBPicker rgb={backgroundValueRGB} onChange={updateBackgroundColor} />
						<HSLPicker hsl={backgroundValueHSL} onChange={updateBackgroundColor} />
					</div>
					<div>
						<RGBPicker rgb={textColorValueRGB} onChange={updateTextColor} />
						<HSLPicker hsl={textColorValueHSL} onChange={updateTextColor} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContrastChecker;
