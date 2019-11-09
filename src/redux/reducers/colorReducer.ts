import { State } from "../interfaces";

const mode = localStorage.getItem("mode");

const initialState: State = {
	hex: "#0faded",
	contrastColor: "#000",
	mode: mode || "hex"
};

export function colorReducer(state: any = initialState, action: any) {
	switch (action.type) {
		case "SET_COLOR":
			return { ...state, hex: action.hex, contrastColor: action.contrastColor };
		case "SET_MODE":
			return { ...state, mode: action.mode };
		default:
			return state;
	}
}

export default colorReducer;
