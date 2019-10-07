import React, { FC } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";

interface ColorBar {
	hex: string;
	groupName: string;
	value: string;
	contrastColor: string;
}

export const ColorBar: FC<ColorBar> = (props: ColorBar) => {
	const singleClick = (event: any) => {
		/** React does some interesting stuff with "synthetic events" */
		let savedEvent = event;
		let savedTarget = savedEvent.currentTarget as HTMLInputElement;
		if (navigator.clipboard) {
			navigator.clipboard.writeText(savedTarget.value);
			toast(`${savedTarget.value.toUpperCase()} copied to clipboard!`, {
				containerId: props.hex + props.groupName,
				autoClose: 1500,
				closeButton: false,
				type: toast.TYPE.SUCCESS,
				className: css({
					backgroundColor: props.hex,
					color: props.contrastColor,
					border: `1px solid ${props.contrastColor}`
				})
			});
		}
	};

	return (
		<div>
			<button
				onClick={singleClick}
				value={props.value}
				className="color-bar"
				style={{
					outlineColor: props.contrastColor,
					backgroundColor: props.hex,
					color: props.contrastColor
				}}
			>
				<p>{props.value}</p>
			</button>
			<ToastContainer
				hideProgressBar={true}
				enableMultiContainer
				containerId={props.hex + props.groupName}
				position={toast.POSITION.BOTTOM_RIGHT}
			/>
		</div>
	);
};

export default ColorBar;
