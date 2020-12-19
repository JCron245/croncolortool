import { ColorState } from '../interfaces';
import { TinyColor } from '@ctrl/tinycolor';
import { findContrastingColor } from '../../utils/findContrast';
import { getColors } from '../../utils/colorToolUtils';

const mode: 'hex' | 'rgb' | 'hsl' | 'hex8' | 'rgba' = (localStorage.getItem('mode') as any) || 'hex';

const urlParams = new URLSearchParams(window.location.search);

const paramColor = urlParams.get('color');

const initColor = new TinyColor(paramColor || '#0FADED');

const alphaCheck = (mode: string) => {
	return mode === 'hex8' || mode === 'rgba' || mode === 'hsla';
};

const initialState: ColorState = {
	hex: initColor.toHex8String(),
	rgba: initColor.toRgbString(),
	hsla: initColor.toHslString(),
	contrastColor: '#000',
	mode: mode,
	alphaEnabled: alphaCheck(mode),
	copied: '',
	colorSets: getColors(initColor, mode, alphaCheck(mode)),
	showLabels: true,
};

export const colorReducer = (state = initialState, action: any): ColorState => {
	let tc;
	switch (action.type) {
		case 'SET_COLOR_HSLA':
			tc = new TinyColor(action.hsla);
			return {
				...state,
				hex: tc.toHex8String(),
				contrastColor: findContrastingColor(action.rgba, tc.getAlpha()),
				colorSets: getColors(tc, state.mode, alphaCheck(state.mode)),
				rgba: tc.toRgbString(),
				hsla: action.hsla,
			};
		case 'SET_COLOR_RGBA':
			tc = new TinyColor(action.rgba);
			return {
				...state,
				hex: tc.toHex8String(),
				contrastColor: findContrastingColor(action.rgba, tc.getAlpha()),
				colorSets: getColors(tc, state.mode, alphaCheck(state.mode)),
				rgba: action.rgba,
				hsla: tc.toHslString(),
			};
		case 'SET_COLOR':
			tc = new TinyColor(action.hex);
			return {
				...state,
				hex: action.hex,
				contrastColor: findContrastingColor(action.hex, tc.getAlpha()),
				colorSets: getColors(tc, state.mode, alphaCheck(state.mode)),
				rgba: tc.toRgbString(),
				hsla: tc.toHslString(),
			};
		case 'SET_MODE':
			const isAlpha = alphaCheck(action.mode);
			tc = new TinyColor(state.hex);
			tc.setAlpha(1);
			window.localStorage.setItem('mode', action.mode);
			if (isAlpha !== state.alphaEnabled) {
				return {
					...state,
					hex: tc.toHex8String(),
					rgba: tc.toRgbString(),
					hsla: tc.toHslString(),
					mode: action.mode,
					colorSets: getColors(tc, action.mode, isAlpha),
					alphaEnabled: isAlpha,
				};
			} else {
				return { ...state, mode: action.mode, colorSets: getColors(tc, action.mode, isAlpha), alphaEnabled: isAlpha };
			}
		case 'SET_COPIED':
			return { ...state, copied: action.hex };
		case 'SET_SHOW':
			return {
				...state,
				showLabels: action.show,
			};
		default:
			return state;
	}
};
