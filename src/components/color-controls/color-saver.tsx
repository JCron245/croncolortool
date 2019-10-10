import React, { FC, useCallback } from "react";
import Select from "react-select";
import "./color-saver.scss";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { css } from "glamor";

interface ColorSaver {
	color: string;
	contrastColor: string;
}

const initialSave = [{ value: "#0faded", label: "#0faded" }];

export const ColorSaver: FC<ColorSaver> = (props: ColorSaver) => {
	const dispatch = useDispatch();

	const selectColor = useCallback(
		event => {
			console.log(event);
			return dispatch({ type: "newColor", color: event.value });
		},
		[dispatch]
	);

	let colors = localStorage.getItem("saved-colors") || undefined;
	let parsedColors: { value: string; label: string }[] = colors
		? JSON.parse(colors)
		: initialSave;

	const saveColor = (event: any) => {
		parsedColors.push({ value: `${props.color}`, label: `${props.color}` });
		localStorage.setItem("saved-colors", JSON.stringify(parsedColors));

		toast(`${props.color.toUpperCase()} copied to clipboard!`, {
			containerId: `${props.color}-saver`,
			autoClose: 1500,
			closeButton: false,
			type: toast.TYPE.SUCCESS,
			className: css({
				backgroundColor: props.color,
				color: props.contrastColor,
				border: `1px solid ${props.contrastColor}`
			})
		});
	};

	return (
		<div className="color-saver-controls">
			<Select options={parsedColors} onChange={selectColor} />
			<button onClick={saveColor}>Save</button>
			<ToastContainer
				containerId={`${props.color}-saver`}
				hideProgressBar={true}
				position={toast.POSITION.BOTTOM_RIGHT}
			/>
		</div>
	);
};

export default ColorSaver;
