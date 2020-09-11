import React, { FC, ReactElement } from 'react';
import './compareDemo.scss';
import ReactTooltip from 'react-tooltip';
import wcagInfo from './wcag-info.json';
import { ReactComponent as Eye } from '../../../assets/eye.svg';

export interface ContrastDemo {
	backgroundColor: string;
	textColor: string;
	contrastRatio: any;
}

export const ContrastCompareDemo: FC<ContrastDemo> = (props: ContrastDemo) => {
	const createTooltips = (): ReactElement[] => {
		return wcagInfo.map((wcag) => {
			return (
				<ReactTooltip key={wcag.id + '-key'} id={wcag.id} type="light" className="tooltip">
					<p className="tooltip-title">{wcag.rule}</p>
					<span>{wcag.title}</span>
					<ul aria-labelledby={wcag.id + '-title'}>
						{wcag.items.map((item) => {
							return <li key={wcag.id + '-item-key'}>{item}</li>;
						})}
					</ul>
				</ReactTooltip>
			);
		});
	};

	const textStyle = {
		color: props.textColor,
	};

	return (
		<div className="demo-section">
			{createTooltips}
			<div className="summary">
				<h1>
					Contrast Color Checker{' '}
					<span aria-hidden="true">
						<Eye style={{ fill: props.textColor }} />
					</span>
				</h1>
				<p>
					Contrast and color use are vital to accessibility. Users, including users with visual disabilities, must be able to perceive
					content on the page. For example Color blindness affects approximately 1 in 12 men (8%) and 1 in 200 women in the world. So a
					proper amount of contrast must be provided on web pages to ensure it is readable by all users.
				</p>
				<p>
					You can use the tool below to simulate a background and text color to get the contrast ratio between the two as a numerical value
					as well as to see for yourself just how well the colors contrast together.
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
			</div>
			<div className="examples">
				<span className="text-box small">10px Font Size Example Text</span>
				<span className="text-box normal">16px Font Size Example Text</span>
				<span className="text-box large-bold">18.66px Bold Font Size Example Text</span>
				<span className="text-box large">24px Font Size Example Text</span>
			</div>
		</div>
	);
};
