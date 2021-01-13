import { FC } from 'react';
import './hslPicker.scss';
import { TinyColor } from '@ctrl/tinycolor';
import { CronSlider } from '../cronSlider/cronSlider';
import Typography from '@material-ui/core/Typography';

interface HSLPickerProps {
	hex?: string;
	hsla?: string;
	isAlpha?: boolean;
	onChange: any;
}

const createBgColors = (hsla: any) => {
	const s = (hsla.s * 100).toFixed();
	const l = (hsla.l * 100).toFixed();
	return {
		alphaLeft: new TinyColor(`hsla(${hsla.h},${s}%,${l}%, 0)`).toRgbString(),
		alphaRight: new TinyColor(`hsla(${hsla.h},${s}%,${l}%, 1)`).toRgbString(),
		saturationLeft: new TinyColor(`hsl(${hsla.h},0%,${l}%)`).toRgbString(),
		saturationRight: new TinyColor(`hsl(${hsla.h},100%,${l}%)`).toRgbString(),
		lightMiddle: new TinyColor(`hsl(${hsla.h},${s}%,50%)`).toRgbString(),
	};
};

export const HSLPicker: FC<HSLPickerProps> = (props: HSLPickerProps) => {
	const hsla = new TinyColor(props.hsla || props.hex).toHsl();
	const isAlpha = props.isAlpha;
	const backgroundColors = createBgColors(hsla);
	const satGradient = `linear-gradient(to right, ${backgroundColors.saturationLeft}, ${backgroundColors.saturationRight})`;
	const lightGradient = `linear-gradient(to right, #000, ${backgroundColors.lightMiddle}, #FFF)`;
	const alphaGradient = `linear-gradient(to right, ${backgroundColors.alphaLeft}, ${backgroundColors.alphaRight})`;

	const setHue = (event: any, newValue: number | number[]) => {
		props.onChange(`hsla(${newValue},${hsla.s},${hsla.l},${hsla.a})`);
	};

	const setSaturation = (event: any, newValue: number | number[]) => {
		newValue = Math.round(newValue as number);
		props.onChange(`hsla(${hsla.h},${newValue / 100},${hsla.l},${hsla.a})`);
	};

	const setLightness = (event: any, newValue: number | number[]) => {
		newValue = Math.round(newValue as number);
		props.onChange(`hsla(${hsla.h},${hsla.s},${newValue / 100},${hsla.a})`);
	};

	const setAlpha = (event: any, newValue: number | number[]) => {
		props.onChange(`hsla(${hsla.h},${hsla.s},${hsla.l},${newValue})`);
	};

	return (
		<>
			<Typography id="input-slider-hue" gutterBottom>
				Hue
			</Typography>
			<CronSlider
				aria-label="Red Slider"
				className="input-slider-hue"
				max={359}
				min={0}
				onChange={setHue}
				step={1}
				value={Math.round(hsla.h)}
				valueLabelDisplay="auto"
			/>
			<Typography id="input-slider" gutterBottom>
				Saturation
			</Typography>
			<CronSlider
				aria-label="Green Slider"
				className="input-slider-sat"
				max={100}
				min={0}
				onChange={setSaturation}
				step={1}
				style={{
					background: satGradient,
				}}
				value={Math.round(hsla.s * 100)}
				valueLabelDisplay="auto"
			/>
			<Typography id="input-slider" gutterBottom>
				Lightness
			</Typography>
			<CronSlider
				aria-label="Blue Slider"
				className="input-slider-lit"
				max={100}
				min={0}
				onChange={setLightness}
				step={1}
				style={{
					background: lightGradient,
				}}
				value={Math.round(hsla.l * 100)}
				valueLabelDisplay="auto"
			/>
			{isAlpha && (
				<>
					<Typography id="input-slider" gutterBottom>
						Alpha
					</Typography>
					<CronSlider
						aria-label="Alpha Slider"
						className="input-slider-alpha"
						max={1.0}
						min={0}
						onChange={setAlpha}
						step={0.01}
						style={{
							background: alphaGradient,
						}}
						value={hsla.a}
						valueLabelDisplay="auto"
					/>
				</>
			)}
		</>
	);
};
