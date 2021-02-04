import { FC } from 'react';
import { Grid, Paper, Typography, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel } from '@material-ui/core';
import { HexColorPicker } from 'react-colorful';
import { HEXPicker } from './hexPicker/HexPicker';
import { RGBPicker } from './rgbPicker/RgbPicker';
import { HSLPicker } from './hslPicker/HslPicker';
import { ColorMode } from '../colorMode/ColorMode';
import './colorControl.scss';

interface ColorControlProps {
	disableAlpha?: boolean;
	hex: string;
	hsla?: string;
	isAlpha?: boolean;
	mode?: string;
	onColorUpdateHSLA?: (v: string) => void;
	onColorUpdateHex: (v: string) => void;
	onColorUpdateRgba?: (v: string) => void;
	onModeChange?: (v: string) => void;
	onShowLabelChange?: (v: boolean) => void;
	rgba?: string;
	showLabels?: boolean;
	title?: string;
}

export const ColorControl: FC<ColorControlProps> = (props: ColorControlProps) => {
	const {
		disableAlpha,
		hex,
		hsla,
		isAlpha,
		mode,
		onColorUpdateHSLA,
		onColorUpdateHex,
		onColorUpdateRgba,
		onModeChange,
		onShowLabelChange,
		rgba,
		showLabels,
		title,
	} = props;
	const backgroundColorHex = hex?.startsWith('#') ? hex : `#${hex}`;

	return (
		<Grid container direction="column" className="color-control-grid" style={{ backgroundColor: backgroundColorHex }}>
			<Paper component="form" className="picker-form">
				{title && <Typography component="h2">{title}</Typography>}
				<HexColorPicker color={hex} onChange={onColorUpdateHex} className="custom-color-picker" />
				{mode && <ColorMode onChangeMode={onModeChange} mode={mode} disableAlpha={disableAlpha} />}
				{onShowLabelChange && (
					<FormControl component="fieldset">
						<FormLabel component="legend">Labels</FormLabel>
						<FormGroup onChange={(event: any) => onShowLabelChange(event.target.checked)}>
							<FormControlLabel control={<Checkbox color="primary" checked={showLabels} name="Show Labels" />} label="Show Labels" />
						</FormGroup>
					</FormControl>
				)}
				{(mode === 'hex' || mode === 'hex8') && <HEXPicker hex={hex} onChange={onColorUpdateHex} mode={mode} />}
				{(mode === 'rgb' || mode === 'rgba') && <RGBPicker rgba={rgba} isAlpha={isAlpha} onChange={onColorUpdateRgba} />}
				{(mode === 'hsl' || mode === 'hsla') && <HSLPicker hsla={hsla} isAlpha={isAlpha} onChange={onColorUpdateHSLA} />}
			</Paper>
		</Grid>
	);
};
