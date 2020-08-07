import React, { FC } from 'react';
import './contrastCompareResults.scss';

export interface ContrastResults {
	contrastRatio: number;
	smallAA: boolean;
	largeAA: boolean;
	smallAAA: boolean;
	largeAAA: boolean;
}

const ContrastCompareResults: FC<ContrastResults> = (props: ContrastResults) => {
	return (
		<div className="contrast-results-wrapper">
			<div className="ratio">Contrast Ratio: {Number(props.contrastRatio).toFixed(2)}</div>
			<div className="results">
				<div className={'wcag-box aa ' + (props.smallAA ? 'good' : 'bad')}>
					<span>>= 4.5</span>
					<span>AA Small Text</span>
				</div>
				<div className={'wcag-box aaa ' + (props.smallAAA ? 'good' : 'bad')}>
					<span>>= 7</span>
					<span>AAA Small Text</span>
				</div>
				<div className={'wcag-box aa ' + (props.largeAA ? 'good' : 'bad')}>
					<span>>= 3.1</span>
					<span>AA Large Text</span>
				</div>
				<div className={'wcag-box aaa ' + (props.largeAAA ? 'good' : 'bad')}>
					<span>>= 4.5</span>
					<span>AAA Large Text</span>
				</div>
			</div>
		</div>
	);
};

export default ContrastCompareResults;
