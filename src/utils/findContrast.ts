import { readability } from '@ctrl/tinycolor';

const difference = (a: number, b: number) => {
	return Math.abs(a - b);
};

const BLACK = '#000';
const WHITE = '#FFF';

/**
 * Takes a color and determines the readability score of it against a black and white
 * color then returns whichever has the highest score.
 *
 * If an alpha value is passed in it will switch to returning a white (#fff) hex value
 * here since the app has a dark theme depending on how much of a difference is found between
 * the white and black readability score
 *
 * @param {string} color
 * @param {number} [alpha=1]
 * @return {*}  {('#000' | '#FFF')}
 */

export const findContrastingColor = (color: string, alpha: number = 1): '#000' | '#FFF' => {
	/**
	 * The readability score of the color passed in against a totally white color #FFF
	 */
	let whiteReadabilityScore = readability(color, WHITE);
	/**
	 * The readability score of the color passed in against a totally black color #000
	 */
	let blackReadabilityScore = readability(color, BLACK);
	if (difference(whiteReadabilityScore, blackReadabilityScore) < 5 && alpha < 0.75) return WHITE;
	if (difference(whiteReadabilityScore, blackReadabilityScore) < 7 && alpha < 0.6) return WHITE;
	if (difference(whiteReadabilityScore, blackReadabilityScore) < 9 && alpha < 0.4) return WHITE;
	if (alpha < 0.25) return WHITE;
	return whiteReadabilityScore > blackReadabilityScore ? WHITE : BLACK;
};
