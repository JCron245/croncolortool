import { getContrastRatio } from '../../utils/getContrastRatio';
import { ContrastCheckState } from '../interfaces';
import { TinyColor } from '@ctrl/tinycolor';
import { findContrastingColor } from '../../utils/findContrast';

const bgMode: 'hex' | 'rgb' | 'hsl' = (localStorage.getItem('contrast-bg-mode') as any) || 'hex';
const txtMode: 'hex' | 'rgb' | 'hsl' = (localStorage.getItem('contrast-txt-mode') as any) || 'hex';

const initialState: ContrastCheckState = {
	backgroundColor: {
		contrastColor: '#000',
		hex: '#0FADED',
		hsl: 'hsl(197,88%,49%)',
		mode: bgMode,
		rgb: 'rgb(15,173,237)',
	},
	textColor: {
		contrastColor: '#fff',
		hex: '#2C0E02',
		hsl: 'hsl(17,91%,9%)',
		mode: txtMode,
		rgb: 'rgb(44,14,2)',
	},
	ratio: 7.02,
	wcagPasses: {
		small: { aa: true, aaa: true },
		large: { aa: true, aaa: true },
	},
};

export const contrastReducer = (state = initialState, action: any): ContrastCheckState => {
	let ratio;
	let isHex;
	switch (action.type) {
		case 'SET_BACKGROUND_COLOR':
			ratio = getContrastRatio(action.backgroundColor, state.textColor.hex);
			isHex = !action.backgroundColor.startsWith('rgb') && !action.backgroundColor.startsWith('hsl');
			const backgroundColorTC = new TinyColor(action.backgroundColor);
			return {
				...state,
				backgroundColor: {
					contrastColor: findContrastingColor(action.backgroundColor),
					hex: isHex ? action.backgroundColor : backgroundColorTC.toHexString(),
					hsl: backgroundColorTC.toHslString(),
					mode: state.backgroundColor.mode,
					rgb: backgroundColorTC.toRgbString(),
				},
				ratio: ratio,
				wcagPasses: {
					small: { aa: ratio >= 4.5, aaa: ratio >= 7 },
					large: { aa: ratio >= 3.1, aaa: ratio >= 4.5 },
				},
			};
		case 'SET_TEXT_COLOR':
			ratio = getContrastRatio(state.backgroundColor.hex, action.textColor);
			isHex = !(action.textColor.startsWith('rgb') && action.textColor.startsWith('hsl'));
			const textColorTC = new TinyColor(action.textColor);
			return {
				...state,
				textColor: {
					contrastColor: findContrastingColor(action.textColor),
					hex: isHex ? action.textColor : textColorTC.toHexString(),
					hsl: textColorTC.toHslString(),
					mode: state.textColor.mode,
					rgb: textColorTC.toRgbString(),
				},
				ratio: ratio,
				wcagPasses: {
					small: { aa: ratio >= 4.5, aaa: ratio >= 7 },
					large: { aa: ratio >= 3.1, aaa: ratio >= 4.5 },
				},
			};
		case 'SET_BACKGROUND_MODE':
			window.localStorage.setItem('contrast-bg-mode', action.mode);
			return {
				...state,
				backgroundColor: {
					...state.backgroundColor,
					mode: action.mode,
				},
			};
		case 'SET_TEXTCOLOR_MODE':
			window.localStorage.setItem('contrast-txt-mode', action.mode);
			return {
				...state,
				textColor: {
					...state.textColor,
					mode: action.mode,
				},
			};
		default:
			return state;
	}
};
