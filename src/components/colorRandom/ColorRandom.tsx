/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useEffect, useState } from 'react';
import './colorRandom.scss';
import { Paper, Button, FormControl, InputLabel, Select, MenuItem, Typography, Grid } from '@material-ui/core';
import { RandomOptions } from '@ctrl/tinycolor';
import { random } from '@ctrl/tinycolor';
import { findContrastingColor } from '../../utils/findContrast';
import { copyColor } from '../../utils/copy';
import { genericColorEvent } from '../routes/Tracker';

const gaCategory = 'Random Color Generator';

export const RandomColor: FC = () => {
	const [currentColor, setCurrentColor] = useState('#0FADED');
	const [currentContrast, setCurrentContrast] = useState('#000');
	const [hue, setHue] = useState<RandomOptions['hue']>('');
	const [luminosity, setLuminosity] = useState<RandomOptions['luminosity'] | 'none' | ''>('');

	const generateRandomColor = () => {
		let lm = luminosity === 'none' || luminosity === '' ? undefined : luminosity;
		let newColor = random({ hue: hue === 'none' ? undefined : hue, luminosity: lm }).toHexString();
		setCurrentColor(newColor);
		genericColorEvent(gaCategory, 'Random Color Generated', newColor);
	};

	useEffect(() => {
		setCurrentContrast(findContrastingColor(currentColor));
	}, [currentColor]);

	const handleChangeHue = (event: ChangeEvent<{ value: unknown }>) => {
		setHue(event.target.value as string);
	};
	const handleChangeLuminosity = (event: ChangeEvent<{ value: unknown }>) => {
		setLuminosity(event.target.value as RandomOptions['luminosity']);
	};

	return (
		<div
			className="color-random full-page"
			style={{
				backgroundColor: currentColor,
			}}>
			<Paper className="color-random-paper" component="form">
				<Grid container justify="space-evenly" className="color-random-grid" spacing={1}>
					<Grid item xs={12}>
						<Typography
							className="current-color"
							style={{
								backgroundColor: currentColor,
								color: currentContrast,
							}}>
							{currentColor}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel id="random-hue-control">Hue</InputLabel>
							<Select labelId="random-hue-control" value={hue} onChange={handleChangeHue}>
								<MenuItem value="none">None</MenuItem>
								<MenuItem value="blue">Blue</MenuItem>
								<MenuItem value="green">Green</MenuItem>
								<MenuItem value="monochrome">Monochrome</MenuItem>
								<MenuItem value="orange">Orange</MenuItem>
								<MenuItem value="pink">Pink</MenuItem>
								<MenuItem value="purple">Purple</MenuItem>
								<MenuItem value="red">Red</MenuItem>
								<MenuItem value="yellow">Yellow</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel id="random-luminosity-control">Luminosity</InputLabel>
							<Select labelId="random-luminosity-control" value={luminosity} onChange={handleChangeLuminosity}>
								<MenuItem value="none">None</MenuItem>
								<MenuItem value="bright">Bright</MenuItem>
								<MenuItem value="dark">Dark</MenuItem>
								<MenuItem value="light">Light</MenuItem>
								<MenuItem value="random">Random</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<Button fullWidth variant="contained" onClick={generateRandomColor}>
							Generate Random Color
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Button fullWidth variant="contained" onClick={() => copyColor(currentColor, currentContrast, gaCategory)}>
							Copy To Clipboard
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};
