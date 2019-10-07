import React, { FC, useCallback } from "react";
import "./color-mode.scss";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../state";

export const ColorMode: FC = () => {
	const store: State = useSelector((store: State) => store);

	const dispatch = useDispatch();

	const changeMode = useCallback(
		event => {
			const savedEvent = event;
			return dispatch({ type: savedEvent.currentTarget.value });
		},
		[dispatch]
	);

	const activeStyle = {
		backgroundColor: store.currentColor.hexString,
		color: store.currentColor.contrastColor
	};

	return (
		<div className="color-mode-controls">
			<button
				value="showHEX"
				onClick={changeMode}
				className={store.mode.showHEX ? "hex active" : "hex"}
				title="switch to hex"
				style={store.mode.showHEX ? activeStyle : {}}
			>
				Hex
			</button>
			<button
				value="showHSL"
				onClick={changeMode}
				className={store.mode.showHSL ? "hsl active" : "hsl"}
				title="switch to hsl"
				style={store.mode.showHSL ? activeStyle : {}}
			>
				Hsl
			</button>
			<button
				value="showRGB"
				onClick={changeMode}
				className={store.mode.showRGB ? "rgb active" : "rgb"}
				title="switch to rgb"
				style={store.mode.showRGB ? activeStyle : {}}
			>
				Rgb
			</button>
		</div>
	);
};

export default ColorMode;
