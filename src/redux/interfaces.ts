import { RouterState } from 'connected-react-router';

export interface State {
	color: Color;
	router: RouterState;
}

export interface Color {
	hex: string;
	contrastColor: string;
	mode: 'rgb' | 'hsl' | 'hex' | string;
	copied: string;
}
