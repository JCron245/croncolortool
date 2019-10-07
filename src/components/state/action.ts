export interface Action {
	type: "newColor" | "showRGB" | "showHSL" | "showHEX";
	color: string;
	showRGB: boolean;
	showHSL: boolean;
	showHEX: boolean;
}
