/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import './contrastCompare.scss';
import RGBPicker from '../rgbPicker/RgbPicker';
import HSLPicker from '../hslPicker/HslPicker';
import ContrastDemo from './contrastCompareDemo/ContrastCompareDemo';
import { ContrastCheck, State } from '../../redux/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { setColors } from '../../redux/actions/contrastActions';
import ContrastResults from './contrastCompareResults/ContrastCompareResults';
import Helmet from 'react-helmet';
import { TinyColor } from '@ctrl/tinycolor';
import HexBox from '../hexBox/HexBox';

const ContrastChecker: FC = () => {
	const store: ContrastCheck = useSelector((store: State) => store.contrast);
	const dispatch = useDispatch();
	const [backgroundColor, setBackgroundColor] = useState(store.backgroundColor);
	const [textColor, setTextColor] = useState(store.textColor);

	useEffect(() => {
		if (store.textColor !== textColor && new TinyColor(textColor).isValid) {
			dispatch(setColors(backgroundColor, textColor));
		}
	}, [textColor]);

	useEffect(() => {
		if (store.backgroundColor !== backgroundColor && new TinyColor(backgroundColor).isValid) {
			dispatch(setColors(backgroundColor, textColor));
		}
	}, [backgroundColor]);

	const currentStyle = {
		backgroundColor: backgroundColor,
		color: textColor
	};

	return (
		<div className="contrast-checker" style={currentStyle}>
			<Helmet>
				<title>Contrast Checker Tool</title>
			</Helmet>
			<ContrastDemo contrastRatio={store.ratio} textColor={textColor} backgroundColor={backgroundColor} />
			<ContrastResults
				contrastRatio={store.ratio}
				smallAA={store.wcagPasses.small.aa}
				smallAAA={store.wcagPasses.small.aaa}
				largeAA={store.wcagPasses.large.aa}
				largeAAA={store.wcagPasses.large.aaa}
			/>
			<div className="input-section">
				<form className="background-choice colors">
					<HexBox display={true} label="Background" hex={backgroundColor} onChange={setBackgroundColor} />
					<RGBPicker hex={backgroundColor} onChange={setBackgroundColor} onChangeComplete={setBackgroundColor} />
					<HSLPicker hex={backgroundColor} onChange={setBackgroundColor} onChangeComplete={setBackgroundColor} />
				</form>
				<form className="text-choice colors">
					<HexBox display={true} label="Text" hex={store.textColor} onChange={setTextColor} />
					<RGBPicker hex={textColor} onChange={setTextColor} onChangeComplete={setTextColor} />
					<HSLPicker hex={textColor} onChange={setTextColor} onChangeComplete={setTextColor} />
				</form>
			</div>
		</div>
	);
};

export default ContrastChecker;
