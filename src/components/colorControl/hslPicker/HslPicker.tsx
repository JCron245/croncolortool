import React, { FC } from 'react';
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

export const HSLPicker: FC<HSLPickerProps> = (props: HSLPickerProps) => {
	const hsla = new TinyColor(props.hsla || props.hex).toHsl();
	const isAlpha = props.isAlpha;

	const setHue = (event: any, newValue: number | number[]) => {
		props.onChange(`hsla(${newValue},${hsla.s},${hsla.l},${hsla.a})`);
	};

	const setSaturation = (event: any, newValue: number | number[]) => {
		props.onChange(`hsla(${hsla.h},${(newValue as number) / 100},${hsla.l},${hsla.a})`);
	};

	const setLightness = (event: any, newValue: number | number[]) => {
		props.onChange(`hsla(${hsla.h},${hsla.s},${(newValue as number) / 100},${hsla.a})`);
	};

	const setAlpha = (event: any, newValue: number | number[]) => {
		props.onChange(`hsla(${hsla.h},${hsla.s},${hsla.l},${newValue})`);
	};

	const backgroundColors = {
		alphaLeft: new TinyColor(`hsla(${hsla.h},${(hsla.s * 100).toFixed()}%,${hsla.l * 100}%, 0)`).toRgbString(),
		alphaRight: new TinyColor(`hsla(${hsla.h},${(hsla.s * 100).toFixed()}%,${hsla.l * 100}%, 1)`).toRgbString(),
		saturationLeft: new TinyColor(`hsl(${hsla.h},0%,${hsla.l * 100}%)`).toRgbString(),
		saturationRight: new TinyColor(`hsl(${hsla.h},100%,${hsla.l * 100}%)`).toRgbString(),
		lightMiddle: new TinyColor(`hsl(${hsla.h.toFixed()},${(hsla.s * 100).toFixed()}%,50%)`).toRgbString(),
	};

	return (
		<>
			<Typography id="input-slider-hue" gutterBottom>
				Hue
			</Typography>
			<CronSlider
				min={0}
				max={359}
				step={1}
				value={Math.round(hsla.h)}
				onChange={setHue}
				valueLabelDisplay="auto"
				className={'input-slider-hue'}
				aria-label={'Red Slider'}
			/>
			<Typography id="input-slider" gutterBottom>
				Saturation
			</Typography>
			<CronSlider
				min={0}
				max={100}
				step={1}
				value={Math.round(hsla.s * 100)}
				onChange={setSaturation}
				valueLabelDisplay="auto"
				className={'input-slider-sat'}
				aria-label={'Green Slider'}
				style={{
					background: `linear-gradient(to right, ${backgroundColors.saturationLeft}, ${backgroundColors.saturationRight})`,
				}}
			/>
			<Typography id="input-slider" gutterBottom>
				Lightness
			</Typography>
			<CronSlider
				min={0}
				max={100}
				step={1}
				value={Math.round(hsla.l * 100)}
				onChange={setLightness}
				valueLabelDisplay="auto"
				className={'input-slider-lit'}
				aria-label={'Blue Slider'}
				style={{
					background: `linear-gradient(to right, #000, ${backgroundColors.lightMiddle}, #FFF)`,
				}}
			/>
			{isAlpha && (
				<>
					<Typography id="input-slider" gutterBottom>
						Alpha
					</Typography>
					<CronSlider
						min={0}
						max={1.0}
						step={0.01}
						value={hsla.a}
						onChange={setAlpha}
						valueLabelDisplay="auto"
						className={'input-slider-alpha'}
						aria-label={'Alpha Slider'}
						style={{
							background: `linear-gradient(to right, ${backgroundColors.alphaLeft}, ${backgroundColors.alphaRight})`,
						}}
					/>{' '}
				</>
			)}
		</>
	);
};
