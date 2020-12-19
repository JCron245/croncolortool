export function setColorHex(color: string) {
	return {
		type: 'SET_COLOR',
		hex: color,
	};
}

export function setColorRGBA(color: string) {
	return {
		type: 'SET_COLOR_RGBA',
		rgba: color,
	};
}

export function setColorHSLA(color: string) {
	return {
		type: 'SET_COLOR_HSLA',
		hsla: color,
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

export function setShow(show: boolean) {
	return { type: 'SET_SHOW', show };
}
