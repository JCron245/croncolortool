import { findContrastingColor } from '../../utils/findContrast';
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
	split: ColorObject[];
	triadic: ColorObject[];
	tetradic: ColorObject[];
	pentadic: ColorObject[];
	monochromatic: ColorObject[];
}

const getColors = (color: string, mode: string): ColorSets => {
	color = new TinyColor(color).toHexString();
	const createColorObject = (color: string): ColorObject => {
		return {
			color,
			contrast: findContrastingColor(color),
			showValue: mode === 'hex' ? color : mode === 'hsl' ? new TinyColor(color).toHslString() : new TinyColor(color).toRgbString(),
		};
	};

	const initialBar = createColorObject(color);

	const createLightArray = (color: string, step: number = 7.5, limit: number = 10): ColorObject[] => {
		const shades: any[] = [initialBar];
		for (let i = 1; i < limit; i++) {
			const lighten = `#${new TinyColor(color).lighten(step * i).toHex()}`;
			if (lighten === shades[i - 1].color) {
				break;
			}
			shades.push(createColorObject(lighten));
		}
		return shades;
	};

	const createDarkArray = (color: string, step: number = 7.5, limit: number = 10): ColorObject[] => {
		const shades: any[] = [initialBar];
		for (let i = 1; i < limit; i++) {
			const darken = `#${new TinyColor(color).darken(step * i).toHex()}`;
			if (darken === shades[i - 1].color) {
				break;
			}
			shades.push(createColorObject(darken));
		}
		return shades;
	};

	const createTintArray = (color: string, step: number = 10, limit: number = 10): ColorObject[] => {
		const shades: any[] = [initialBar];
		for (let i = 1; i < limit; i++) {
			const tinted = `#${new TinyColor(color).tint(step * i).toHex()}`;
			if (tinted === shades[i - 1].color) {
				break;
			}
			shades.push(createColorObject(tinted));
		}
		return shades;
	};

	const createShadeArray = (color: string, step: number = 10, limit: number = 10): ColorObject[] => {
		const shades: any[] = [initialBar];
		for (let i = 1; i < limit; i++) {
			const shaded = `#${new TinyColor(color).shade(step * i).toHex()}`;
			if (shaded === shades[i - 1].color) {
				break;
			}
			shades.push(createColorObject(shaded));
		}
		return shades;
	};

	const createSaturationArray = (color: string, step: number = 7.5, limit: number = 10): ColorObject[] => {
		const shades: any[] = [initialBar];
		for (let i = 1; i < limit; i++) {
			const saturated = `#${new TinyColor(color).saturate(step * i).toHex()}`;
			if (saturated === shades[i - 1].color) {
				break;
			}
			shades.push(createColorObject(saturated));
		}
		return shades;
	};

	const createDesaturationArray = (color: string, step: number = 7.5, limit: number = 10): ColorObject[] => {
		const shades: any[] = [initialBar];
		for (let i = 1; i < limit; i++) {
			const desaturated = `#${new TinyColor(color).desaturate(step * i).toHex()}`;
			if (desaturated === shades[i - 1].color) {
				break;
			}
			shades.push(createColorObject(desaturated));
		}
		return shades;
	};

	const createAnalogousArray = (color: string): ColorObject[] => {
		return new TinyColor(color).analogous().map((color) => createColorObject(color.toHexString()));
	};

	const createMonochromaticArray = (color: string): ColorObject[] => {
		return new TinyColor(color).monochromatic().map((color) => createColorObject(color.toHexString()));
	};

	const createComplementArray = (color: string): ColorObject[] => {
		let complement = new TinyColor(color).complement().toHexString();
		return [createColorObject(color), createColorObject(complement)];
	};

	const createSplitComplementArray = (color: string): ColorObject[] => {
		return new TinyColor(color).splitcomplement().map((color) => createColorObject(color.toHexString()));
	};

	const createTriadArray = (color: string): ColorObject[] => {
		return new TinyColor(color).triad().map((color) => createColorObject(color.toHexString()));
	};

	const createTetradArray = (color: string): ColorObject[] => {
		return new TinyColor(color).tetrad().map((color) => createColorObject(color.toHexString()));
	};

	const createPentadArray = (color: string): ColorObject[] => {
		return new TinyColor(color).polyad(5).map((color) => createColorObject(color.toHexString()));
	};

	return {
		lighter: createLightArray(color),
		darker: createDarkArray(color),
		tint: createTintArray(color),
		shade: createShadeArray(color),
		saturated: createSaturationArray(color),
		desaturated: createDesaturationArray(color),
		analogous: createAnalogousArray(color),
		complementary: createComplementArray(color),
		split: createSplitComplementArray(color),
		triadic: createTriadArray(color),
		tetradic: createTetradArray(color),
		pentadic: createPentadArray(color),
		monochromatic: createMonochromaticArray(color),
	};
};

export { getColors };
