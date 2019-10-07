export interface State {
	currentColor: StateCurrentColor;
	mode: StateCurrentMode;
}

export interface StateCurrentColor {
	hexString: string;
	rgbArray: any[];
	hslArray: any[];
	nameString: string;
	contrastColor: string;
}

export interface StateCurrentMode {
	showRGB: boolean;
	showHSL: boolean;
	showHEX: boolean;
}
