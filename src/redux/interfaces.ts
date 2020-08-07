import { RouterState } from 'connected-react-router';

export interface State {
	color: Color;
	router: RouterState;
	contrast: ContrastCheck;
}

export interface Color {
	hex: string;
	contrastColor: string;
	mode: 'rgb' | 'hsl' | 'hex' | string;
	copied: string;
}

export interface ContrastCheck {
	backgroundColor: string;
	textColor: string;
	ratio: number;
	wcagPasses: {
		small: WCAGRule;
		large: WCAGRule;
	};
}

export interface WCAGRule {
	aa: boolean;
	aaa: boolean;
}
