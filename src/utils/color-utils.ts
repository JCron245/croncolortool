import chroma from 'chroma-js';
import tinycolor from 'tinycolor2';

export const createLightArray = (color: string): string[] => {
	const shades: any[] = [];
	for (let i = 0; i < 12; i++) {
		const lighten = `#${tinycolor(color)
			.lighten(7.5 * i)
			.toHex()}`;
		if (lighten === shades[i - 1]) {
			break;
		}
		shades.push(lighten);
	}
	return shades;
};

export const createDarkArray = (color: string): string[] => {
	const shades: any[] = [];
	for (let i = 0; i < 12; i++) {
		const darken = `#${tinycolor(color)
			.darken(7.5 * i)
			.toHex()}`;
		if (darken === shades[i - 1]) {
			break;
		}
		shades.push(darken);
	}
	return shades;
};

export const createSaturationArray = (color: string): string[] => {
	const shades: any[] = [];
	for (let i = 0; i < 12; i++) {
		const saturated = `#${tinycolor(color)
			.saturate(7.5 * i)
			.toHex()}`;
		if (saturated === shades[i - 1]) {
			break;
		}
		shades.push(saturated);
	}
	return shades;
};

export const createDesaturationArray = (color: string): string[] => {
	const shades: any[] = [];
	for (let i = 0; i < 12; i++) {
		const desaturated = `#${tinycolor(color)
			.desaturate(7.5 * i)
			.toHex()}`;
		if (desaturated === shades[i - 1]) {
			break;
		}
		shades.push(desaturated);
	}
	return shades;
};

export const createAnalogousArray = (color: string): any[] => {
	return tinycolor(color)
		.analogous()
		.map(color => color.toHexString());
};

export const createMonochromaticArray = (color: string): any[] => {
	return tinycolor(color)
		.monochromatic()
		.map(color => color.toHexString());
};

export const createComplementArray = (color: string): string[] => {
	return [
		color,
		tinycolor(color)
			.complement()
			.toHexString()
	];
};

export const createSplitComplementArray = (color: string): any[] => {
	return tinycolor(color)
		.splitcomplement()
		.map(color => color.toHexString());
};

export const createTriadArray = (color: string): any[] => {
	return tinycolor(color)
		.triad()
		.map(color => color.toHexString());
};

export const createTetradArray = (color: string): any[] => {
	return tinycolor(color)
		.tetrad()
		.map(color => color.toHexString());
};

export const findContrastingColor = (color: string): string => {
	return chroma.contrast(color, '#FFF') > chroma.contrast(color, '#000') ? '#FFF' : '#000';
};
