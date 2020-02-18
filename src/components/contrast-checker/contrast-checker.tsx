/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import './contrast-checker.scss';
import RGBPicker from '../rgb-picker/rgb-picker';
import HSLPicker from '../hsl-picker/hsl-picker';
import ContrastDemo from './contrast-demo/contrast-demo';
import { ContrastCheck, State } from '../../redux/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { setColors } from '../../redux/actions/contrastActions';
import chroma from 'chroma-js';
import ContrastResults from './contrast-results/contrast-results';
import Helmet from 'react-helmet';

const ContrastChecker: FC = () => {
	const store: ContrastCheck = useSelector((store: State) => store.contrast);
	const dispatch = useDispatch();

	const [backgroundValue, setBackgroundValue] = useState(store.backgroundColor);
	const [textColorValue, setTextColorValue] = useState(store.textColor);

	useEffect(() => {
		if (chroma.valid(textColorValue)) {
			dispatch(setColors(backgroundValue, textColorValue));
		}
	}, [textColorValue]);

	useEffect(() => {
		if (chroma.valid(backgroundValue)) {
			dispatch(setColors(backgroundValue, textColorValue));
		}
	}, [backgroundValue]);

	const currentStyle = {
		backgroundColor: store.backgroundColor,
		color: store.textColor
	};

	return (
		<div className="contrast-checker" style={currentStyle}>
			<Helmet>
				<title>Contrast Checker Tool</title>
			</Helmet>
			<ContrastDemo contrastRatio={store.ratio} textColor={store.textColor} backgroundColor={store.backgroundColor} />
			<ContrastResults
				contrastRatio={store.ratio}
				smallAA={store.wcagPasses.small.aa}
				smallAAA={store.wcagPasses.small.aaa}
				largeAA={store.wcagPasses.large.aa}
				largeAAA={store.wcagPasses.large.aaa}
			/>
			<div className="input-section">
				<form className="background-choice colors">
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
								setBackgroundValue(e.target.value);
							}}
						/>
						<div className="color-display-box" style={{ backgroundColor: store.backgroundColor }}></div>
					</div>
					<RGBPicker hex={backgroundValue} onChange={setBackgroundValue} onChangeComplete={setBackgroundValue} />
					<HSLPicker hex={backgroundValue} onChange={setBackgroundValue} onChangeComplete={setBackgroundValue} />
				</form>
				<form className="text-choice colors">
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
								setTextColorValue(e.target.value);
							}}
						/>
						<div className="color-display-box" style={{ backgroundColor: store.textColor }}></div>
					</div>
					<RGBPicker hex={textColorValue} onChange={setTextColorValue} onChangeComplete={setTextColorValue} />
					<HSLPicker hex={textColorValue} onChange={setTextColorValue} onChangeComplete={setTextColorValue} />
				</form>
			</div>
		</div>
	);
};

export default ContrastChecker;
