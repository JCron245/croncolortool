import chroma from 'chroma-js';

export default class {
	static findContrastingColor = (color: string): string => {
		const lightContrast = chroma.contrast(color, '#FFF');
		const darkContrast = chroma.contrast(color, '#000');
		return lightContrast > darkContrast ? '#FFF' : '#000';
	};

	static trimHSL = (hslArr: number[]): string => {
		let arr = hslArr.map(
			(val: number): number => {
				// Something is wrong with chroma and occasionally I am seeing a nan value here. Upon investigation it seems
				// to only occur sometimes when the HUE value is 0, thus intercepting here and converting it to a 0 this will
				// require further testing to ensure our HSL values are accurate!
				if (isNaN(val)) {
					val = 0;
				}
				return Number(val.toFixed(2));
			}
		);
		return arr.toString().replace(/,/g, ', ');
	};
}
