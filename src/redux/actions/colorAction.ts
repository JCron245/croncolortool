import { findContrastingColor } from '../../utils/color-utils';

export function setColor (color: string) {
	return { type: 'SET_COLOR', hex: color, contrastColor: findContrastingColor(color) }
}

export function setMode(mode: string) {
	return { type: 'SET_MODE', mode }
}
