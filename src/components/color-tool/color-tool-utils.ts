import tinycolor from 'tinycolor2';
import { findContrastingColor } from '../../utils/find-contrast';
import chroma from 'chroma-js';

export interface ColorObject {
	color: string;
	contrast: string;
	hsl: any;
	rgb: string;
}

export const createLightArray = (color: string, step: number = 7.5, limit: number = 10): ColorObject[] => {
	const shades: any[] = [];
	for (let i = 0; i < limit; i++) {
		const lighten = `#${tinycolor(color)
			.lighten(step * i)
			.toHex()}`;
		if (i > 0 && lighten === shades[i - 1].color) {
			break;
		}
		shades.push(createColorObject(lighten));
	}
	return shades;
};

export const createDarkArray = (color: string, step: number = 7.5, limit: number = 10): ColorObject[] => {
	const shades: any[] = [];
	for (let i = 0; i < limit; i++) {
		const darken = `#${tinycolor(color)
			.darken(step * i)
			.toHex()}`;
		if (i > 0 && darken === shades[i - 1].color) {
			break;
		}
		shades.push(createColorObject(darken));
	}
	return shades;
};

export const createSaturationArray = (color: string, step: number = 7.5, limit: number = 10): ColorObject[] => {
	const shades: any[] = [];
	for (let i = 0; i < limit; i++) {
		const saturated = `#${tinycolor(color)
			.saturate(step * i)
			.toHex()}`;
		if (i > 0 && saturated === shades[i - 1].color) {
			break;
		}
		shades.push(createColorObject(saturated));
	}
	return shades;
};

export const createDesaturationArray = (color: string, step: number = 7.5, limit: number = 10): ColorObject[] => {
	const shades: any[] = [];
	for (let i = 0; i < limit; i++) {
		const desaturated = `#${tinycolor(color)
			.desaturate(step * i)
			.toHex()}`;
		if (i > 0 && desaturated === shades[i - 1].color) {
			break;
		}
		shades.push(createColorObject(desaturated));
	}
	return shades;
};

export const createAnalogousArray = (color: string): ColorObject[] => {
	return tinycolor(color)
		.analogous()
		.map(color => createColorObject(color.toHexString()));
};

export const createMonochromaticArray = (color: string): ColorObject[] => {
	return tinycolor(color)
		.monochromatic()
		.map(color => createColorObject(color.toHexString()));
};

export const createComplementArray = (color: string): ColorObject[] => {
	let complement = tinycolor(color)
		.complement()
		.toHexString();
	return [createColorObject(color), createColorObject(complement)];
};

export const createSplitComplementArray = (color: string): ColorObject[] => {
	return tinycolor(color)
		.splitcomplement()
		.map(color => createColorObject(color.toHexString()));
};

export const createTriadArray = (color: string): ColorObject[] => {
	return tinycolor(color)
		.triad()
		.map(color => createColorObject(color.toHexString()));
};

export const createTetradArray = (color: string): ColorObject[] => {
	return tinycolor(color)
		.tetrad()
		.map(color => createColorObject(color.toHexString()));
};

export const createColorObject = (color: string): ColorObject => {
	const hsl = tinycolor(color).toHsl();
	return {
		color: color,
		contrast: findContrastingColor(color),
		hsl: `${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%`,
		rgb: chroma(color)
			.rgb()
			.toString()
	};
};
