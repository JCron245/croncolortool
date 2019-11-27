import React, { FC, useState } from 'react';
import './contrast-checker.scss';
import chroma from 'chroma-js';

const ContrastChecker: FC = () => {
	const [inputOneValue, setInputOneValue] = useState('#0FADED');
	const [inputTwoValue, setInputTwoValue] = useState('#000');
	const [contrastRatio, setContrastRatio] = useState(8.22);

	const updateOne = (event: any) => {
		setInputOneValue(event.target.value);
		if (chroma.valid(event.target.value) && chroma.valid(inputTwoValue)) {
			let tmp = chroma.contrast(event.target.value, inputTwoValue);
			setContrastRatio(tmp);
		}
	};

	const updateTwo = (event: any) => {
		setInputTwoValue(event.target.value);
		if (chroma.valid(event.target.value) && chroma.valid(inputOneValue)) {
			let tmp = chroma.contrast(inputOneValue, event.target.value);
			setContrastRatio(tmp);
		}
	};

	return (
		<div className="contrast-checker">
			<div className="test-box">
				<div className="colors">
					<input name="color-one" value={inputOneValue} onChange={updateOne} />
					<input name="color-two" value={inputTwoValue} onChange={updateTwo} />
				</div>
				<div className="results">
					<div className="title">
						<p>WCAG Level</p>
						<div>{Number(contrastRatio).toFixed(2)}</div>
					</div>
					<div className="result-boxes">
						<div>
							<p>AA</p>
							<div>
								<p>Exceptions:</p>
								<ul></ul>
							</div>
						</div>
						<div>AAA</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContrastChecker;
