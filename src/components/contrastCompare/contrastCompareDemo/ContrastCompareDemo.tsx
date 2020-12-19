import React, { FC } from 'react';
import { ReactComponent as Eye } from '../../../assets/eye.svg';
import { Grid, Typography, Card, CardContent, withStyles } from '@material-ui/core';

export interface ContrastDemo {
	backgroundColor: string;
	textColor: string;
}

export const ContrastCompareDemo: FC<ContrastDemo> = (props: ContrastDemo) => {
	const { backgroundColor, textColor } = props;

	const TextColorTypograhpy = withStyles({
		root: {
			color: textColor,
		},
	})(Typography);

	return (
		<>
			<Grid item xs={12} sm={5}>
				<Card variant={'outlined'} style={{ backgroundColor: backgroundColor, color: textColor, borderColor: textColor }}>
					<CardContent>
						<h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
							Contrast Color Checker
							<span aria-hidden="true">
								<Eye style={{ fill: textColor }} />
							</span>
						</h2>
						<TextColorTypograhpy>
							Contrast and color use are vital to accessibility. Users, including those with visual disabilities, must be able to perceive
							content on the page. For example Color blindness affects approximately 1 in 12 men (8%) and 1 in 200 women in the world. So a
							proper amount of contrast must be provided on web pages to ensure it is readable by all users.
						</TextColorTypograhpy>
						<TextColorTypograhpy>
							You can use this tool to simulate a background and text color to get the contrast ratio between the two as a numerical value
							as well as to see for yourself just how well the colors contrast together.
						</TextColorTypograhpy>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} sm={5}>
				<Card variant={'outlined'} style={{ backgroundColor: backgroundColor, borderColor: textColor, color: textColor }}>
					<CardContent>
						<h2 id="wcag-contrast">WCAG Contrast Rules:</h2>
						<ul aria-labelledby="wcag-contrast" className="wcag-list">
							<li aria-labelledby="wcag143">
								WCAG 2.0 1.4.3 (AA): requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.
							</li>
							<li aria-labelledby="wcag1411">
								WCAG 2.1 1.4.11 Non-text Contrast (AA): requires a contrast ratio of at least 3:1 for graphics and user interface components
								(such as form input borders).
							</li>
							<li aria-labelledby="wcag146">
								WCAG 2.0 1.4.6 Contrast (Enhanced) (AAA): requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large
								text.
							</li>
						</ul>
						<p>
							Large text is defined as being 18 point (typically 24px) or greater. Alternatively if the text is bold, then large text is
							defined as 14 point (typically 18.66px) or greater.
						</p>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} sm={10}>
				<TextColorTypograhpy>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum metus sit amet euismod vulputate. Phasellus ipsum nisl,
					malesuada id libero a, lacinia mattis ante. Phasellus egestas dui nunc, maximus pretium arcu iaculis sed. Sed leo orci, laoreet in
					nisl vitae, tincidunt fringilla odio. Vestibulum justo turpis, imperdiet ac tincidunt et, rutrum id massa. In luctus auctor
					rutrum. Vivamus blandit mi ut posuere volutpat. Vestibulum est ante, accumsan sed cursus a, molestie vel dui. Donec tristique
					purus et velit feugiat malesuada. Etiam scelerisque arcu non leo vulputate semper.
				</TextColorTypograhpy>
				<TextColorTypograhpy>
					Maecenas sapien quam, hendrerit nec sapien non, mattis hendrerit ex. Suspendisse ut ipsum pellentesque, mattis arcu vel, pretium
					est. Praesent in urna eget lorem placerat venenatis in ut justo. Phasellus lobortis eget nunc ut dignissim. Vestibulum vestibulum
					tellus ac leo maximus posuere. Integer porta convallis elit non sodales. Morbi auctor lectus eu convallis tempus. Quisque
					vestibulum aliquet felis ac sollicitudin. Pellentesque imperdiet lacus ut lorem vehicula, ut egestas odio lacinia. Morbi eu
					posuere lorem. Proin suscipit mauris id nisi ultrices auctor.
				</TextColorTypograhpy>
			</Grid>
		</>
	);
};
