import React, { FC } from "react";
import "./color-mode.scss";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../redux/interfaces";
import { setMode } from "../../redux/actions/colorAction";
import { toast } from "react-toastify";
import { css } from "glamor";

export const ColorMode: FC = () => {
	const store: State = useSelector((store: State) => store);
	const dispatch = useDispatch();

	const changeMode = (event: any) => {
		const savedEvent = event;
		if (event.currentTarget.value) {
			dispatch(setMode(savedEvent.currentTarget.value));

			toast(
				`Color mode switched to ${savedEvent.currentTarget.value.toUpperCase()}`,
				{
					containerId: "toasts-container",
					autoClose: 1500,
					closeButton: false,
					type: toast.TYPE.SUCCESS,
					className: css({
						backgroundColor: store.hex,
						color: store.contrastColor,
						border: `1px solid ${store.contrastColor}`,
						textAlign: "center"
					})
				}
			);
		}
	};

	const activeStyle = {
		backgroundColor: store.hex,
		color: store.contrastColor
	};

	return (
		<div className="color-mode-controls">
			<button
				value="hex"
				onClick={changeMode}
				className={store.mode === "hex" ? "hex active" : "hex"}
				title="switch to hex"
				style={store.mode === "hex" ? activeStyle : {}}
			>
				Hex
			</button>
			<button
				value="rgb"
				onClick={changeMode}
				className={store.mode === "rgb" ? "rgb active" : "rgb"}
				title="switch to rgb"
				style={store.mode === "rgb" ? activeStyle : {}}
			>
				Rgb
			</button>
		</div>
	);
};

export default ColorMode;
