import { State, Action } from "./index";
import chroma from "chroma-js";
import { StateCurrentMode } from "./state";

const mode = localStorage.getItem("mode");
const stateMode: StateCurrentMode = mode
	? JSON.parse(mode)
	: { showHEX: true, showRGB: false, showHSL: false };

const initialState = {
	currentColor: {
		hexString: "#0FADED",
		rgbArray: [15, 173, 237],
		hslArray: [197, 0.88, 0.49],
		nameString: "",
		contrastColor: "#000"
	},
	mode: stateMode
};

export const reducer = (state: any = initialState, action: Action): State => {
	if (action.color && action.type === "newColor") {
		const newColor = action.color;
		const colorHex = chroma(newColor).hex();
		const colorName =
			chroma(newColor).name() !== colorHex ? chroma(newColor).name() : "";
		return {
			currentColor: {
				nameString: colorName,
				hexString: colorHex,
				rgbArray: chroma(action.color).rgb(),
				hslArray: chroma(action.color)
					.hsl()
					.map((el: number, index: number) => {
						if (index === 3) return false;
						if (index === 0 && isNaN(el)) return true;
						return el.toFixed(2);
					}),
				contrastColor:
					chroma.contrast(colorHex, "#FFF") > chroma.contrast(colorHex, "#000")
						? "#FFF"
						: "#000"
			},
			mode: {
				showRGB: state.mode.showRGB,
				showHSL: state.mode.showHSL,
				showHEX: state.mode.showHEX
			}
		};
	}

	if (action.type === "showRGB") {
		let newMode = { showRGB: true, showHSL: false, showHEX: false };
		localStorage.setItem("mode", JSON.stringify(newMode));
		return {
			currentColor: state.currentColor,
			mode: newMode
		};
	}

	if (action.type === "showHSL") {
		let newMode = { showRGB: false, showHSL: true, showHEX: false };
		localStorage.setItem("mode", JSON.stringify(newMode));
		return {
			currentColor: state.currentColor,
			mode: newMode
		};
	}

	if (action.type === "showHEX") {
		let newMode = { showRGB: false, showHSL: false, showHEX: true };
		localStorage.setItem("mode", JSON.stringify(newMode));
		return {
			currentColor: state.currentColor,
			mode: newMode
		};
	}

	return state;
};
