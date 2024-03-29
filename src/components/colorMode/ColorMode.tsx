import { FC } from 'react';
import './colorMode.scss';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from '@material-ui/core';

export interface ColorModeProps {
	disableAlpha?: boolean;
	mode: string;
	onChangeMode: any;
}

export const ColorMode: FC<ColorModeProps> = (props: ColorModeProps) => {
	const { mode, onChangeMode, disableAlpha } = props;

	return (
		<FormControl component="fieldset" style={{ width: '100%' }}>
			<FormLabel component="legend">
				<Typography>Color Mode</Typography>
			</FormLabel>
			<RadioGroup
				row
				aria-label="Color Mode Selector"
				name="colorMode"
				value={mode}
				onChange={onChangeMode}
				style={{ justifyContent: 'space-evenly', width: '100%' }}>
				<FormControlLabel labelPlacement="top" value="hex" control={<Radio color="primary" size="small" />} label="HEX" />
				{!disableAlpha && (
					<FormControlLabel labelPlacement="top" value="hex8" control={<Radio color="primary" size="small" />} label="HEX8" />
				)}
				<FormControlLabel labelPlacement="top" value="rgb" control={<Radio color="primary" size="small" />} label="RGB" />
				{!disableAlpha && (
					<FormControlLabel labelPlacement="top" value="rgba" control={<Radio color="primary" size="small" />} label="RGBA" />
				)}
				<FormControlLabel labelPlacement="top" value="hsl" control={<Radio color="primary" size="small" />} label="HSL" />
				{!disableAlpha && (
					<FormControlLabel labelPlacement="top" value="hsla" control={<Radio color="primary" size="small" />} label="HSLA" />
				)}
			</RadioGroup>
		</FormControl>
	);
};
