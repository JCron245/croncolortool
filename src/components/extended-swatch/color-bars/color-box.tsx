import React, { FC } from "react";
import ColorBar from "./color-bar";
import "./color-box.scss";
import chroma from "chroma-js";
import { cleanHSL } from "../../../utils/color-utils";
import { findContrastingColor } from "../../../utils/color-utils";

interface ColorBox {
	colors: string[];
	name: string;
	show: string;
}

export const ColorBox: FC<ColorBox> = (props: ColorBox) => {
	return (
		<div className="color-box">
			<p>{props.name}</p>
			<div>
				{props.colors.map((color: string, index: number) => {
					const value =
						props.show === "hex"
							? color
							: props.show === "rgb"
							? chroma(color)
									.rgb()
									.toString()
							: cleanHSL(chroma(color).hsl());
					const contrast = findContrastingColor(color);
					return (
						<ColorBar
							groupName={props.name}
							hex={color}
							value={value}
							contrastColor={contrast}
							key={index}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ColorBox;
