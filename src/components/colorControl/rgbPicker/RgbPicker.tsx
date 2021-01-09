import { FC } from 'react';
import './rgbPicker.scss';
import { TinyColor } from '@ctrl/tinycolor';
import { CronSlider } from '../cronSlider/cronSlider';
import { Typography } from '@material-ui/core';

interface RGBPickerProps {
	hex?: string;
	isAlpha?: boolean;
	onChange?: any;
	rgba?: string;
}

export const RGBPicker: FC<RGBPickerProps> = (props: RGBPickerProps) => {
	const rgba = new TinyColor(props.rgba || props.hex).toRgb();
	const isAlpha = props.isAlpha;

	const setRed = (event: any, newValue: number | number[]) => {
		props.onChange(`rgba(${newValue},${rgba.g},${rgba.b},${rgba.a})`);
	};

	const setGreen = (event: any, newValue: number | number[]) => {
		props.onChange(`rgba(${rgba.r},${newValue},${rgba.b},${rgba.a})`);
	};

	const setBlue = (event: any, newValue: number | number[]) => {
		props.onChange(`rgba(${rgba.r},${rgba.g},${newValue},${rgba.a})`);
	};

	const setAlpha = (event: any, newValue: number | number[]) => {
		props.onChange(`rgba(${rgba.r},${rgba.g},${rgba.b},${newValue})`);
	};

	return (
		<>
			<Typography id="input-slider-hue" gutterBottom>
				Red
			</Typography>
			<CronSlider
				aria-label="Red Slider"
				className="input-slider-red"
				max={255}
				min={0}
				onChange={setRed}
				value={rgba.r}
				valueLabelDisplay="auto"
			/>
			<Typography id="input-slider-hue" gutterBottom>
				Green
			</Typography>
			<CronSlider
				aria-label="Green Slider"
				className="input-slider-green"
				max={255}
				min={0}
				onChange={setGreen}
				value={rgba.g}
				valueLabelDisplay="auto"
			/>
			<Typography id="input-slider-hue" gutterBottom>
				Blue
			</Typography>
			<CronSlider
				aria-label="Blue Slider"
				className="input-slider-blue"
				max={255}
				min={0}
				onChange={setBlue}
				value={rgba.b}
				valueLabelDisplay="auto"
			/>
			{isAlpha && (
				<>
					<Typography id="input-slider-hue" gutterBottom>
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
							background: `linear-gradient(to right, rgba(${rgba.r},${rgba.g},${rgba.b},0) 0%, rgba(${rgba.r},${rgba.g},${rgba.b},1) 100%)`,
						}}
						value={rgba.a}
						valueLabelDisplay="auto"
					/>
				</>
			)}
		</>
	);
};
