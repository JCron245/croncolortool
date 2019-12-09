import React, { FC, useState } from 'react';
import './contrast-checker.scss';
import chroma from 'chroma-js';
import tinycolor from 'tinycolor2';
import RGBPicker from '../rgb-picker/rgb-picker';
import HSLPicker from '../hsl-picker/hsl-picker';
import ReactTooltip from 'react-tooltip';
import wcagInfo from './wcag-info.json';

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
			console.log(value);
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

	const wcag = (background: any = null, text: any = null) => {
		setTimeout(() => {
			setSmallAAValue(tinycolor.isReadable(background || backgroundValue, text || textColorValue, { level: 'AA', size: 'small' }));
			setSmallAAAValue(tinycolor.isReadable(background || backgroundValue, text || textColorValue, { level: 'AAA', size: 'small' }));
			setLargeAAValue(tinycolor.isReadable(background || backgroundValue, text || textColorValue, { level: 'AA', size: 'large' }));
			setLargeAAAValue(tinycolor.isReadable(background || backgroundValue, text || textColorValue, { level: 'AAA', size: 'large' }));
		});
	};

	const createTooltips = () => {
		return wcagInfo.map(wcag => {
			return (
				<ReactTooltip key={wcag.id + '-key'} id={wcag.id} type="light" className="tooltip" role="tooltip">
					<p className="tooltip-title">{wcag.rule}</p>
					<span>{wcag.title}</span>
					<ul aria-labelledby={wcag.id + '-title'}>
						{wcag.items.map((item, index) => {
							return <li key={wcag.id + '-item-key-' + index}>{item.text}</li>;
						})}
					</ul>
				</ReactTooltip>
			);
		});
	};

	const currentStyle = {
		backgroundColor: backgroundValue,
		color: textColorValue
	};

	const textStyle = {
		color: textColorValue
	};

	const eyeSVG = () => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" style={{ fill: textColorValue }} width="3.5rem" version="1.0" viewBox="0 0 1280 662">
				<path d="M633 1c-139.9 9.1-279.2 59.4-418.9 151.5-69.4 45.7-141.5 105-195.7 160.9L.1 332.3l10 10.8c14 15.1 58.3 56.9 83.9 79.4 144.6 126.7 296.5 205.3 444.5 229.9 42.3 7 66 9 110.5 9 38.3.1 51.7-.7 84.5-4.9 100.6-12.9 198.5-48.2 296-106.8 87.6-52.6 176.7-128.7 242.9-207.5l7.8-9.3-1.9-2.2c-1.1-1.2-7.5-8.7-14.4-16.7-111.1-129.9-237.3-223.9-364.4-271.8C841.9 20.6 788.4 8.2 727 2.4 707.5.6 652.3-.2 633 1zm42.1 58c56.2 5.6 109.6 27.5 153.4 62.7 30.6 24.6 56.1 56.4 73.4 91.6 9.1 18.4 13.7 30.4 18.7 48.6 13.6 49.6 12.3 103.3-3.7 152.1-8.1 24.6-17.9 44.8-32.4 66.5-10.9 16.3-19.3 26.4-34.9 42-23.2 23.2-45 38.7-75.1 53.5-28 13.8-55 22.2-87.5 27.1-19.6 3-58 3.3-77.5.5-68-9.4-124.6-37.8-170.5-85.2-42.2-43.7-67.1-96.3-74.6-157.4-2-16.6-1.5-51.7 1.1-68 15.9-102.9 87.9-186.9 189-220.5 21.8-7.2 40.3-11.1 65.5-13.8 8-.9 45.5-.6 55.1.3z" />
				<path d="M633 126.1c-37.5 3.1-74.2 17.5-103.5 40.4-8.7 6.8-23.7 21.7-30.8 30.6-11 13.6-22.8 34.7-28.6 51.2-7.9 22.5-10.6 40.2-9.8 65.7.7 24.2 3.6 38.5 11.9 59.5 27.7 70.3 98.3 117.4 176 117.5 43.4 0 86.3-14.6 120.3-41.2 8-6.2 24.2-22.6 31-31.3 18.2-23.2 30.7-51.2 35.9-80.4l.6-3.4-4.2 4c-14.2 13-31.9 22.4-51 27-5.6 1.4-11.4 1.8-24.8 1.8-15.9 0-18.4-.3-27.5-2.8-38.1-10.4-67.4-39.5-76.7-76.3-3.2-12.5-3.2-37.1 0-48.6 5.1-18.5 14.4-34.8 27.4-47.8 9-9 17.1-14.8 28.5-20.4 14-6.9 26.1-10.1 42.6-11.3l8.9-.6-6.8-4.4c-34.7-21.9-78.5-32.7-119.4-29.2z" />
			</svg>
		);
	};

	const exSVG = () => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" viewBox="0 0 450 450">
				<circle cx="225" cy="225" r="225" fill={textColorValue} />
				<g fill={backgroundValue} stroke="#FFF" stroke-width="70">
					<path d="M106.742 110.083l236.516 236.516M106.742 346.599l236.516-236.515" />
				</g>
			</svg>
		);
	};

	return (
		<div className="contrast-checker" style={currentStyle}>
			<div className="demo-section">
				{createTooltips()}
				<section className="summary">
					<h1>
						Contrast Color Checker <span aria-hidden="true">{eyeSVG()}</span>
					</h1>
					<p>
						Contrast and color use are vital to accessibility. Users, including users with visual disabilities, must be able to perceive
						content on the page. For example Color blindness affects approximately 1 in 12 men (8%) and 1 in 200 women in the world. So a
						proper amount of contrast must be provided on web pages to ensure it is readable by all users.
					</p>
					<p>
						You can use the tool below to simulate a background and text color to get the contrast ratio between the two as a numerical
						value as well as to see for yourself just how well the colors contrast togther.
					</p>
					<div id="wcag-contrast">WCAG Contrast Rules:</div>
					<ul aria-labelledby="wcag-contrast" className="wcag-list">
						<li aria-labelledby="wcag143">
							<button className="tooltip-toggle" style={textStyle} data-tip data-for="wcag143">
								WCAG 2.0 1.4.3 (AA)
							</button>
							requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.
						</li>
						<li aria-labelledby="wcag1411">
							<button className="tooltip-toggle" style={textStyle} data-tip data-for="wcag1411">
								WCAG 2.1 1.4.11 Non-text Contrast (AA)
							</button>
							requires a contrast ratio of at least 3:1 for graphics and user interface components (such as form input borders).
						</li>
						<li aria-labelledby="wcag146">
							<button className="tooltip-toggle" style={textStyle} data-tip data-for="wcag146">
								WCAG 2.0 1.4.6 Contrast (Enhanced) (AAA)
							</button>
							requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.
						</li>
					</ul>
					<p>Large text is defined as 14 point + (typically 18.66px) and bold, or 18 point + (typically 24px).</p>
				</section>
				<span className="text-box small">10px Text</span>
				<span className="text-box normal">16px Text</span>
				<span className="text-box large-bold">18.66px Bold Text</span>
				<span className="text-box large">24px Text</span>
			</div>
			<div className="input-section">
				<div className="ratio">Contrast Ratio: {Number(contrastRatio).toFixed(2)}</div>
				<div className="results">
					<div className={'wcag-box aa ' + (smallAAValue ? 'good' : 'bad')}>
						<span>>= 4.5</span>
						<span>AA Small Text</span>
					</div>
					<div className={'wcag-box aaa ' + (smallAAAValue ? 'good' : 'bad')}>
						<span>>= 7</span>
						<span>AAA Small Text</span>
					</div>
					<div className={'wcag-box aa ' + (largeAAValue ? 'good' : 'bad')}>
						<span>>= 3.1</span>
						<span>AA Large Text</span>
					</div>
					<div className={'wcag-box aaa ' + (largeAAAValue ? 'good' : 'bad')}>
						<span>>= 4.5</span>
						<span>AAA Large Text</span>
					</div>
				</div>
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
