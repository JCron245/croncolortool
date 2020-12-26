/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect, useCallback } from 'react';
import { TinyColor, Numberify, RGBA } from '@ctrl/tinycolor';
import { CronSlider } from '../cronSlider/cronSlider';
import Typography from '@material-ui/core/Typography';
import { TextField, FormControl, FormLabel } from '@material-ui/core';

interface HEXPickerProps {
	hex?: string;
	mode: string;
	onChange: any;
}

const modeCheck = (hex: string, mode: string) => {
	hex = hex.replace('#', '');
	if (mode === 'hex' && hex.length > 6) {
		return false;
	}
	if (mode === 'hex8' && hex.length > 8) {
		return false;
	}
	return true;
};

export const HEXPicker: FC<HEXPickerProps> = (props: HEXPickerProps) => {
	const { hex, mode, onChange } = props;
	const [inputHex, setInputHex] = useState(hex);
	const [isValid, setIsValid] = useState<boolean>();
	const [rgba, setRgba] = useState<Numberify<RGBA>>();

	useEffect(() => {
		if (hex) {
			let tc = new TinyColor(hex);
			if (mode === 'hex') {
				if (tc.isValid && hex.length < 7) {
					setInputHex(hex);
				} else {
					setInputHex(tc.toHexString());
				}
			} else {
				setInputHex(hex);
			}
			setRgba(tc.toRgb());
			setIsValid(tc.isValid);
		}
	}, [hex, mode]);

	const hexInputChange = (event: any) => {
		let color = event.target.value;
		let tc = new TinyColor(color);
		if ((mode === 'hex' && color.length <= 7) || (mode === 'hex8' && color.length <= 9)) {
			setInputHex(color);
			setIsValid(tc.isValid);
		}
		if (tc.isValid && modeCheck(color, mode)) {
			onChange(color);
		}
	};

	const setAlpha = useCallback(
		(event: any, newValue: number | number[]) => {
			onChange(new TinyColor(`rgba(${rgba?.r},${rgba?.g},${rgba?.b},${newValue})`).toHex8String());
		},
		[rgba]
	);

	return (
		<>
			<FormControl component="fieldset" fullWidth>
				<FormLabel component="legend">
					<Typography>Hex</Typography>
				</FormLabel>
				<TextField
					error={!isValid}
					fullWidth
					helperText={!isValid ? 'Invalid Hex' : ''}
					onChange={hexInputChange}
					value={inputHex}
					variant="outlined"
				/>
			</FormControl>
			{rgba && mode === 'hex8' && (
				<FormControl component="fieldset" fullWidth>
					<FormLabel component="legend">
						<Typography>Alpha</Typography>
					</FormLabel>
					<CronSlider
						aria-label={'Alpha Slider'}
						className={'input-slider-alpha'}
						max={1.0}
						min={0}
						onChange={setAlpha}
						step={0.01}
						style={{
							background: `linear-gradient(to right, rgba(${rgba?.r},${rgba?.g},${rgba?.b},0) 0%, rgba(${rgba?.r},${rgba?.g},${rgba?.b},1) 100%)`,
						}}
						value={Number(rgba?.a?.toFixed(2))}
						valueLabelDisplay="auto"
					/>
				</FormControl>
			)}
		</>
	);
};
