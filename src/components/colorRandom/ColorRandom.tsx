/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import './colorRandom.scss';
import { Paper, Button, FormControl, InputLabel, Select, MenuItem, Typography, Grid } from '@material-ui/core';
import { RandomOptions } from '@ctrl/tinycolor';
import { random } from '@ctrl/tinycolor';
import { findContrastingColor } from '../../utils/findContrast';
import copy from 'clipboard-copy';
import { toast } from 'react-toastify';
import { toastOptions } from '../../utils/getToastOptions';

export const RandomColor: FC = () => {
	const [currentColor, setCurrentColor] = React.useState('#0FADED');
	const [currentContrast, setCurrentContrast] = React.useState('#000');
	const [hue, setHue] = React.useState<RandomOptions['hue']>();
	const [luminosity, setLuminosity] = React.useState<RandomOptions['luminosity'] | 'none'>();

	const singleClick = () => {
		copy(currentColor).then(
			() => {
				toast(`${currentColor.toUpperCase()} copied to clipboard!`, toastOptions(currentColor, currentContrast));
			},
			(err) => {
				console.log('[ERROR] Copy Error: ', err);
			}
		);
	};

	const generateRandomColor = () => {
		setCurrentColor(
			random({ hue: hue === 'none' ? undefined : hue, luminosity: luminosity === 'none' ? undefined : luminosity }).toHexString()
		);
	};

	useEffect(() => {
		setCurrentContrast(findContrastingColor(currentColor));
	}, [currentColor]);

	const handleChangeHue = (event: React.ChangeEvent<{ value: unknown }>) => {
		setHue(event.target.value as string);
	};
	const handleChangeLuminosity = (event: React.ChangeEvent<{ value: unknown }>) => {
		setLuminosity(event.target.value as RandomOptions['luminosity']);
	};

	return (
		<div
			className={'color-random'}
			style={{
				backgroundColor: currentColor,
			}}>
			<Paper component={'form'} style={{ maxWidth: '20rem', minHeight: '20rem', padding: '1rem' }}>
				<Grid container justify={'space-evenly'} className={'color-random-grid'} spacing={1}>
					<Grid item xs={12}>
						<Typography
							className={'current-color'}
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
								<MenuItem value={'none'}>None</MenuItem>
								<MenuItem value={'red'}>Red</MenuItem>
								<MenuItem value={'orange'}>Orange</MenuItem>
								<MenuItem value={'yellow'}>Yellow</MenuItem>
								<MenuItem value={'green'}>Green</MenuItem>
								<MenuItem value={'blue'}>Blue</MenuItem>
								<MenuItem value={'purple'}>Purple</MenuItem>
								<MenuItem value={'pink'}>Pink</MenuItem>
								<MenuItem value={'monochrome'}>Monochrome</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel id="random-luminosity-control">Luminosity</InputLabel>
							<Select labelId="random-luminosity-control" value={luminosity} onChange={handleChangeLuminosity}>
								<MenuItem value={'none'}>None</MenuItem>
								<MenuItem value={'random'}>Random</MenuItem>
								<MenuItem value={'bright'}>Bright</MenuItem>
								<MenuItem value={'light'}>Light</MenuItem>
								<MenuItem value={'dark'}>Dark</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<Button fullWidth variant="contained" onClick={generateRandomColor}>
							Generate Random Color
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Button fullWidth variant="contained" onClick={singleClick}>
							Copy To Clipboard
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};