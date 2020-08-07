import { findContrastingColor } from '../../utils/findContrast';

export function setColor(color: string) {
	return {
		type: 'SET_COLOR',
		hex: color,
		contrastColor: findContrastingColor(color),
	};
}

export function setMode(mode: string) {
	return { type: 'SET_MODE', mode };
}

export function setCopied(copied: string) {
	return {
		type: 'SET_COPIED',
		copied,
	};
}
