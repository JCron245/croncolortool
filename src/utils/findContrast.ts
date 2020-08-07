import { readability } from '@ctrl/tinycolor';

export const findContrastingColor = (color: string): string => {
	return readability(color, '#FFF') > readability(color, '#000') ? '#FFF' : '#000';
};
