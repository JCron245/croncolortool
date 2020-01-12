import chroma from 'chroma-js';

export const getContrastRatio = (color1: string, color2: string): number => {
	return chroma.contrast(color1, color2);
};
