import { ColorState } from '../interfaces';
import { TinyColor } from '@ctrl/tinycolor';
import { findContrastingColor } from '../../utils/findContrast';
import { getColors } from '../../utils/colorToolUtils';
import { genericColorEvent } from '../../components/routes/Tracker';

const mode: 'hex' | 'rgb' | 'hsl' | 'hex8' | 'rgba' = (localStorage.getItem('mode') as any) || 'hex';

const urlParams = new URLSearchParams(window.location.search);

const paramColor = urlParams.get('color');

const initColor = new TinyColor(paramColor || '#0FADED');

const gaCategory = 'Color Tool';

const alphaCheck = (mode: string) => {
	return mode === 'hex8' || mode === 'rgba' || mode === 'hsla';
};

const initialState: ColorState = {
	alphaEnabled: alphaCheck(mode),
	colorSets: getColors(initColor, mode, alphaCheck(mode)),
	contrastColor: '#000',
	copied: '',
	hex: initColor.toHex8String(),
	hsla: initColor.toHslString(),
	mode: mode,
	rgba: initColor.toRgbString(),
	showLabels: true,
};

export const colorReducer = (state = initialState, action: any): ColorState => {
	let tc;
	switch (action.type) {
		case 'SET_COLOR_HSLA':
			tc = new TinyColor(action.hsla);
			return {
				...state,
				colorSets: getColors(tc, state.mode, alphaCheck(state.mode)),
				contrastColor: findContrastingColor(action.rgba, tc.getAlpha()),
				hex: tc.toHex8String(),
				hsla: action.hsla,
				rgba: tc.toRgbString(),
			};
		case 'SET_COLOR_RGBA':
			tc = new TinyColor(action.rgba);
			return {
				...state,
				colorSets: getColors(tc, state.mode, alphaCheck(state.mode)),
				contrastColor: findContrastingColor(action.rgba, tc.getAlpha()),
				hex: tc.toHex8String(),
				hsla: tc.toHslString(),
				rgba: action.rgba,
			};
		case 'SET_COLOR':
			tc = new TinyColor(action.hex);
			return {
				...state,
				colorSets: getColors(tc, state.mode, alphaCheck(state.mode)),
				contrastColor: findContrastingColor(action.hex, tc.getAlpha()),
				hex: action.hex,
				hsla: tc.toHslString(),
				rgba: tc.toRgbString(),
			};
		case 'SET_MODE':
			const isAlpha = alphaCheck(action.mode);
			tc = new TinyColor(state.hex);
			tc.setAlpha(1);
			window.localStorage.setItem('mode', action.mode);
			genericColorEvent(gaCategory, 'Set Mode', `${action.mode}`);
			if (isAlpha !== state.alphaEnabled) {
				return {
					...state,
					alphaEnabled: isAlpha,
					colorSets: getColors(tc, action.mode, isAlpha),
					hex: tc.toHex8String(),
					hsla: tc.toHslString(),
					mode: action.mode,
					rgba: tc.toRgbString(),
				};
			} else {
				return { ...state, mode: action.mode, colorSets: getColors(tc, action.mode, isAlpha), alphaEnabled: isAlpha };
			}
		case 'SET_COPIED':
			return { ...state, copied: action.copied };
		case 'SET_SHOW':
			genericColorEvent(gaCategory, 'Set Labels', `${action.show}`);
			return {
				...state,
				showLabels: action.show,
			};
		default:
			return state;
	}
};
