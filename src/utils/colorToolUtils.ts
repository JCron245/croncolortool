import { findContrastingColor } from './findContrast';
import { TinyColor } from '@ctrl/tinycolor';

export interface ColorObject {
	color: string;
	contrast: string;
	showValue: string;
}

export interface ColorSets {
	lighter: ColorObject[];
	darker: ColorObject[];
	tint: ColorObject[];
	shade: ColorObject[];
	saturated: ColorObject[];
	desaturated: ColorObject[];
	analogous: ColorObject[];
	complementary: ColorObject[];
	split?: ColorObject[];
	triadic?: ColorObject[];
	tetradic?: ColorObject[];
	pentadic?: ColorObject[];
	monochromatic: ColorObject[];
}

const toRgbString = (tc: TinyColor, isAlphaMode: boolean = false): string => {
	const r = Math.round(tc.r);
	const g = Math.round(tc.g);
	const b = Math.round(tc.b);
	return !isAlphaMode ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${tc.roundA})`;
};

const toHslString = (tc: TinyColor, isAlphaMode: boolean = false): string => {
	if (!isAlphaMode) tc.setAlpha(1);
	const hsl = tc.toHsl();
	const h = Math.round(hsl.h);
	const s = Math.round(hsl.s * 100);
	const l = Math.round(hsl.l * 100);
	return !isAlphaMode ? `hsl(${h}, ${s}%, ${l}%)` : `hsla(${h}, ${s}%, ${l}%, ${tc.roundA})`;
};

const createColorObject = (color: TinyColor, mode: string, isAlphaMode: boolean): ColorObject => {
	const hex = isAlphaMode ? color.toHex8String() : color.toHexString();
	let showValue;

	switch (mode as string) {
		case 'hex':
			showValue = color.toHexString();
			break;
		case 'rgb':
		case 'rgba':
			showValue = toRgbString(color, isAlphaMode);
			break;
		case 'hex8':
			showValue = hex;
			break;
		case 'hsl':
		case 'hsla':
			showValue = toHslString(color, isAlphaMode);
			break;
		default:
			showValue = '';
	}

	return {
		color: hex,
		contrast: findContrastingColor(hex, color.getAlpha()),
		showValue,
	};
};

const createLightArray = (color: TinyColor, step: number = 7.5, mode: string, isAlphaMode: boolean, limit: number = 10): ColorObject[] => {
	const shades: any[] = [createColorObject(color, mode, isAlphaMode)];
	for (let i = 1; i < limit; i++) {
		const lighten = new TinyColor(color).lighten(step * i);
		if (lighten === shades[i - 1].color) {
			break;
		}
		shades.push(createColorObject(lighten, mode, isAlphaMode));
	}
	return shades;
};

const createDarkArray = (color: TinyColor, step: number = 7.5, mode: string, isAlphaMode: boolean, limit: number = 10): ColorObject[] => {
	const shades: any[] = [createColorObject(color, mode, isAlphaMode)];
	for (let i = 1; i < limit; i++) {
		const darken = new TinyColor(color).darken(step * i);
		if (darken === shades[i - 1].color) {
			break;
		}
		shades.push(createColorObject(darken, mode, isAlphaMode));
	}
	return shades;
};

const createTintArray = (color: TinyColor, step: number = 10, mode: string, isAlphaMode: boolean, limit: number = 10): ColorObject[] => {
	const shades: any[] = [createColorObject(color, mode, isAlphaMode)];
	for (let i = 1; i < limit; i++) {
		const tinted = new TinyColor(color).tint(step * i);
		if (tinted === shades[i - 1].color) {
			break;
		}
		shades.push(createColorObject(tinted, mode, isAlphaMode));
	}
	return shades;
};

const createShadeArray = (color: TinyColor, step: number = 10, mode: string, isAlphaMode: boolean, limit: number = 10): ColorObject[] => {
	const shades: any[] = [createColorObject(color, mode, isAlphaMode)];
	for (let i = 1; i < limit; i++) {
		const shaded = new TinyColor(color).shade(step * i);
		if (shaded === shades[i - 1].color) {
			break;
		}
		shades.push(createColorObject(shaded, mode, isAlphaMode));
	}
	return shades;
};

const createSaturationArray = (
	color: TinyColor,
	step: number = 7.5,
	mode: string,
	isAlphaMode: boolean,
	limit: number = 10
): ColorObject[] => {
	const shades: any[] = [createColorObject(color, mode, isAlphaMode)];
	for (let i = 1; i < limit; i++) {
		const saturated = new TinyColor(color).saturate(step * i);
		if (saturated === shades[i - 1].color) {
			break;
		}
		shades.push(createColorObject(saturated, mode, isAlphaMode));
	}
	return shades;
};

const createDesaturationArray = (
	color: TinyColor,
	step: number = 7.5,
	mode: string,
	isAlphaMode: boolean,
	limit: number = 10
): ColorObject[] => {
	const shades: any[] = [createColorObject(color, mode, isAlphaMode)];
	for (let i = 1; i < limit; i++) {
		const desaturated = new TinyColor(color).desaturate(step * i);
		if (desaturated === shades[i - 1].color) {
			break;
		}
		shades.push(createColorObject(desaturated, mode, isAlphaMode));
	}
	return shades;
};

const createAnalogousArray = (color: TinyColor, mode: string, isAlphaMode: boolean): ColorObject[] => {
	return new TinyColor(color).analogous().map((c) => createColorObject(c, mode, isAlphaMode));
};

const createMonochromaticArray = (color: TinyColor, mode: string, isAlphaMode: boolean): ColorObject[] => {
	return new TinyColor(color).monochromatic().map((c) => {
		c.setAlpha(color.getAlpha());
		return createColorObject(c, mode, isAlphaMode);
	});
};

const createComplementArray = (color: TinyColor, mode: string, isAlphaMode: boolean): ColorObject[] => {
	let complement = new TinyColor(color).complement();
	return [createColorObject(color, mode, isAlphaMode), createColorObject(complement, mode, isAlphaMode)];
};

const createSplitComplementArray = (color: TinyColor, mode: string, isAlphaMode: boolean): ColorObject[] => {
	return new TinyColor(color).splitcomplement().map((c) => {
		c.setAlpha(color.getAlpha());
		return createColorObject(c, mode, isAlphaMode);
	});
};

const createTriadArray = (color: TinyColor, mode: string, isAlphaMode: boolean): ColorObject[] => {
	return new TinyColor(color).triad().map((c) => {
		c.setAlpha(color.getAlpha());
		return createColorObject(c, mode, isAlphaMode);
	});
};

const createTetradArray = (color: TinyColor, mode: string, isAlphaMode: boolean): ColorObject[] => {
	return new TinyColor(color).tetrad().map((c) => {
		c.setAlpha(color.getAlpha());
		return createColorObject(c, mode, isAlphaMode);
	});
};

const createPentadArray = (color: TinyColor, mode: string, isAlphaMode: boolean): ColorObject[] => {
	return new TinyColor(color).polyad(5).map((c) => {
		c.setAlpha(color.getAlpha());
		return createColorObject(c, mode, isAlphaMode);
	});
};

const getColors = (color: TinyColor, mode: string, isAlphaMode: boolean): ColorSets => {
	color = new TinyColor(color);

	return {
		lighter: createLightArray(color, undefined, mode, isAlphaMode),
		darker: createDarkArray(color, undefined, mode, isAlphaMode),
		tint: createTintArray(color, undefined, mode, isAlphaMode),
		shade: createShadeArray(color, undefined, mode, isAlphaMode),
		saturated: createSaturationArray(color, undefined, mode, isAlphaMode),
		desaturated: createDesaturationArray(color, undefined, mode, isAlphaMode),
		analogous: createAnalogousArray(color, mode, isAlphaMode),
		complementary: createComplementArray(color, mode, isAlphaMode),
		split: createSplitComplementArray(color, mode, isAlphaMode),
		triadic: createTriadArray(color, mode, isAlphaMode),
		tetradic: createTetradArray(color, mode, isAlphaMode),
		pentadic: createPentadArray(color, mode, isAlphaMode),
		monochromatic: createMonochromaticArray(color, mode, isAlphaMode),
	};
};

export { getColors };
