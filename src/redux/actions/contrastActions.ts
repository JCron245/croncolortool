import { getContrastRatio } from '../../utils/getContrastRatio';

export function setColors(backgroundColor: string, textColor: string) {
	let ratio = getContrastRatio(backgroundColor, textColor);
	return {
		type: 'SET_COLORS',
		backgroundColor,
		textColor,
		ratio,
		wcagPasses: {
			small: { aa: ratio >= 4.5, aaa: ratio >= 7 },
			large: { aa: ratio >= 3.1, aaa: ratio >= 4.5 }
		}
	};
}
