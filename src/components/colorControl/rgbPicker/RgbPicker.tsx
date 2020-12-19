import React, { FC } from 'react';
import './rgbPicker.scss';
import { TinyColor } from '@ctrl/tinycolor';
import { CronSlider } from '../cronSlider/cronSlider';
import { Typography } from '@material-ui/core';

interface RGBPickerProps {
	hex?: string;
	rgba?: string;
	isAlpha?: boolean;
	onChange?: any;
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
				min={0}
				max={255}
				value={rgba.r}
				onChange={setRed}
				valueLabelDisplay="auto"
				className={'input-slider-red'}
				aria-label={'Red Slider'}
			/>
			<Typography id="input-slider-hue" gutterBottom>
				Green
			</Typography>
			<CronSlider
				min={0}
				max={255}
				value={rgba.g}
				onChange={setGreen}
				valueLabelDisplay="auto"
				className={'input-slider-green'}
				aria-label={'Green Slider'}
			/>
			<Typography id="input-slider-hue" gutterBottom>
				Blue
			</Typography>
			<CronSlider
				min={0}
				max={255}
				value={rgba.b}
				onChange={setBlue}
				valueLabelDisplay="auto"
				className={'input-slider-blue'}
				aria-label={'Blue Slider'}
			/>
			{isAlpha && (
				<>
					<Typography id="input-slider-hue" gutterBottom>
						Alpha
					</Typography>
					<CronSlider
						min={0}
						max={1.0}
						step={0.01}
						value={rgba.a}
						onChange={setAlpha}
						valueLabelDisplay="auto"
						className={'input-slider-alpha'}
						aria-label={'Alpha Slider'}
						style={{
							background: `linear-gradient(to right, rgba(${rgba.r},${rgba.g},${rgba.b},0) 0%, rgba(${rgba.r},${rgba.g},${rgba.b},1) 100%)`,
						}}
					/>
				</>
			)}
		</>
	);
};
