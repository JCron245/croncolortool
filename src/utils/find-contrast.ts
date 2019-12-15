import chroma from 'chroma-js';

export const findContrastingColor = (color: string): string => {
	return chroma.contrast(color, '#FFF') > chroma.contrast(color, '#000') ? '#FFF' : '#000';
};
