import { readability } from '@ctrl/tinycolor';

export const getContrastRatio = (color1: string, color2: string): number => {
	return readability(color1, color2);
};
