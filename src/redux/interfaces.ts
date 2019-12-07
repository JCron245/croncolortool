export interface State {
	hex: string;
	contrastColor: string;
	mode: 'rgb' | 'hsl' | 'hex' | string;
	copied: string;
}
