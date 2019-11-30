import chroma from 'chroma-js';
import tinycolor from 'tinycolor2';

export const createLightArray = (color: string): string[] => {
	const shades = [];
	for (let i = 0; i < 8; i++) {
		const lightened = chroma(color)
			.brighten(i * 0.75)
			.hex();
		shades.push(lightened);
		if (lightened === '#ffffff') {
			break;
		}
	}
	return shades;
};

export const createDarkArray = (color: string): string[] => {
	const shades = [];
	for (let i = 0; i < 8; i++) {
		const darkened = chroma(color)
			.darken(i * 0.75)
			.hex();
		shades.push(darkened);
		if (darkened === '#000000') {
			break;
		}
	}
	return shades;
};

export const createSaturationArray = (color: string): string[] => {
	const shades: any[] = [];
	const saturation = chroma(color).hsl()[1];
	for (let i = 0; i < 8; i++) {
		const saturated = chroma(color)
			.saturate(saturation * i * 1.75)
			.hex();
		if (saturated === shades[i - 1]) {
			break;
		}
		shades.push(saturated);
	}
	return shades;
};

export const createDesaturationArray = (color: string): string[] => {
	const shades: any[] = [];
	const saturation = chroma(color).hsl()[1];
	for (let i = 0; i < 8; i++) {
		const desaturated = chroma(color)
			.desaturate(saturation * i * 0.75)
			.hex();
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
	return chroma.contrast(color, '#FFF') > chroma.contrast(color, '#000')
		? '#FFF'
		: '#000';
};
