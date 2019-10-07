import React, { useCallback, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./extended-swatch.scss";
import { State } from "../state/index";
import { ColorBox } from "./color-bars/color-box";
import MyColorPicker from "../custom-picker/custom-picker";
import {
	createLightArray,
	createDarkArray,
	createSaturationArray,
	createDesaturationArray,
	createComplementArray,
	createSplitComplementArray,
	createTriadArray,
	createTetradArray,
	createMonochromaticArray,
	createAnalogousArray
} from "../../utils/color-utils";
import { ColorMode } from "../color-mode/color-mode";

const ExtendedSwatch: FC = () => {
	const store: State = useSelector((store: State) => store);
	const show = {
		hex: store.mode.showHEX,
		hsl: store.mode.showHSL,
		rgb: store.mode.showRGB
	};

	const dispatch = useDispatch();

	const dragChange = useCallback(
		event => {
			return dispatch({ type: "newColor", color: event.hex });
		},
		[dispatch]
	);

	return (
		<div className="extended-swatch">
			{/* Color Picker Box */}
			<div className="picker-box">
				<MyColorPicker colorInput={store.currentColor} onChange={dragChange} />
			</div>
			{/* Empty div for 'viewing' the color */}
			<div
				className="viewing-box"
				style={{ backgroundColor: store.currentColor.hexString }}
			></div>
			{/* Box of various color information - shades etc */}
			<div className="info-box">
				<ColorMode />
				<div className="color-box-grid">
					<ColorBox
						name="lighter"
						show={show}
						colors={createLightArray(store.currentColor.hexString)}
					/>
					<ColorBox
						name="darker"
						show={show}
						colors={createDarkArray(store.currentColor.hexString)}
					/>
					<ColorBox
						name="saturated"
						show={show}
						colors={createSaturationArray(store.currentColor.hexString)}
					/>
					<ColorBox
						name="desaturated"
						show={show}
						colors={createDesaturationArray(store.currentColor.hexString)}
					/>
					<ColorBox
						name="analgous"
						show={show}
						colors={createAnalogousArray(store.currentColor.hexString)}
					/>
					<ColorBox
						name="complementary"
						show={show}
						colors={createComplementArray(store.currentColor.hexString)}
					/>
					<ColorBox
						name="split complement"
						show={show}
						colors={createSplitComplementArray(store.currentColor.hexString)}
					/>
					<ColorBox
						name="triadic"
						show={show}
						colors={createTriadArray(store.currentColor.hexString)}
					/>
					<ColorBox
						name="tetradic"
						show={show}
						colors={createTetradArray(store.currentColor.hexString)}
					/>
					<ColorBox
						name="monochromatic"
						show={show}
						colors={createMonochromaticArray(store.currentColor.hexString)}
					/>
				</div>
			</div>
		</div>
	);
};

export default ExtendedSwatch;
