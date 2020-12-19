export function setBackgroundColor(backgroundColor: string) {
	return {
		type: 'SET_BACKGROUND_COLOR',
		backgroundColor,
	};
}

export function setBackgroundMode(mode: string) {
	return {
		type: 'SET_BACKGROUND_MODE',
		mode,
	};
}

export function setTextColor(textColor: string) {
	return {
		type: 'SET_TEXT_COLOR',
		textColor,
	};
}

export function setTextColorMode(mode: string) {
	return {
		type: 'SET_TEXTCOLOR_MODE',
		mode,
	};
}
