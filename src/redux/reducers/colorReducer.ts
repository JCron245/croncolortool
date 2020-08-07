import { Color } from '../interfaces';
import { TinyColor } from '@ctrl/tinycolor';

const mode = localStorage.getItem('mode');

const urlParams = new URLSearchParams(window.location.search);

const paramColor = urlParams.get('color');

const initialState: Color = {
	hex: new TinyColor(paramColor || '').isValid ? `#${paramColor}` : '#0FADED',
	contrastColor: '#000',
	mode: mode || 'hex',
	copied: '',
};

export function colorReducer(state = initialState, action: any) {
	switch (action.type) {
		case 'SET_COLOR':
			return { ...state, hex: action.hex, contrastColor: action.contrastColor };
		case 'SET_MODE':
			return { ...state, mode: action.mode };
		case 'SET_COPIED':
			return { ...state, copied: action.hex };
		default:
			return state;
	}
}

export default colorReducer;
