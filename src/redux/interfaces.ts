import { RouterState } from 'connected-react-router';
import { ColorSets } from '../utils/colorToolUtils';

export interface RootState {
	color: ColorState;
	router: RouterState;
	contrast: ContrastCheckState;
}

export interface ColorState {
	alphaEnabled: boolean;
	/**
	 * Hex value of current color
	 */
	hex: string;
	rgba: string;
	hsla: string;
	/**
	 * #000 (black) or #FFF (white) depending on which has most
	 * contrast with current color
	 */
	contrastColor: '#FFF' | '#000';
	/**
	 * Current display mode
	 */
	mode: 'rgb' | 'hsl' | 'hex' | 'hex8' | 'rgba' | 'hsla';
	/**
	 * Reference to last item sent to clipboard
	 */
	copied: string;
	/**
	 *
	 */
	colorSets: ColorSets;
	/**
	 *
	 */
	showLabels: boolean;
}

export interface ContrastCheckState {
	backgroundColor: ContrastCheckStateColor;
	ratio: number;
	textColor: ContrastCheckStateColor;
	wcagPasses: {
		small: WCAGRule;
		large: WCAGRule;
	};
}

export interface ContrastCheckStateColor {
	contrastColor: string;
	hex: string;
	hsl: string;
	mode: 'rgb' | 'hsl' | 'hex';
	rgb: string;
}

export interface WCAGRule {
	/**
	 * WCAG AA Rating
	 *
	 * Ratio > 4.5 for small text
	 *
	 * Ratio > 3.1 for large text
	 */
	aa: boolean;
	/**
	 * WCAG AAA Rating
	 *
	 * Ratio > 7 for small text
	 *
	 * Ratio > 4.5 for large text
	 */
	aaa: boolean;
}
