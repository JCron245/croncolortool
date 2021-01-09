/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect, ChangeEvent } from 'react';
import './colorBlender.scss';
import { Grid, Paper, TextField } from '@material-ui/core';
import { TinyColor } from '@ctrl/tinycolor';
import ReactGA from 'react-ga';

const gaCategory = 'Color Blender';

export const ColorBlender: FC = () => {
	const [blend, setBlend] = useState('#7e7e7e');
	const [first, setFirst] = useState('#0FADED');
	const [firstValid, setFirstValid] = useState(true);
	const [second, setSecond] = useState('#ed4f0f');
	const [secondValid, setSecondValid] = useState(true);

	useEffect(() => {
		let c1 = new TinyColor(first);
		let c2 = new TinyColor(second);
		if (c1.isValid && c2.isValid) {
			let mix = c1.mix(c2, 50).toHexString();
			if (mix !== blend) {
				ReactGA.event({
					category: gaCategory,
					action: 'Color Blend Generated',
					label: `${mix}`,
				});
			}
			setBlend(mix);
		}
	}, [first, second]);

	const checkFirst = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const tc = new TinyColor(event.target.value);
		setFirstValid(tc.isValid);
		setFirst(event.target.value);
	};

	const checkSecond = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const tc = new TinyColor(event.target.value);
		setSecondValid(tc.isValid);
		setSecond(event.target.value);
	};

	return (
		<div
			className="color-blender"
			style={{
				background: `linear-gradient(90deg, ${first} 0%, ${first} 30%, ${blend} 30%, ${blend} 70%, ${second} 70%, ${second} 100%)`,
			}}>
			<Grid container className="color-blend-grid" justify="space-evenly" alignItems="center">
				<Grid justify="space-evenly" container item xs={12}>
					<Grid item xs={5} sm={1} md={2}>
						<Paper component="form" className="color-input">
							<TextField
								error={!firstValid}
								fullWidth
								helperText={!firstValid ? 'Invalid Hex' : ''}
								label="First Color"
								onChange={checkFirst}
								value={first}
							/>
						</Paper>
					</Grid>
					<Grid item xs={5} sm={1} md={2}>
						<Paper component="form" className="color-input">
							<TextField
								error={!secondValid}
								fullWidth
								helperText={!secondValid ? 'Invalid Hex' : ''}
								label="Second Color"
								onChange={checkSecond}
								value={second}
							/>
						</Paper>
					</Grid>
				</Grid>
				<Grid container justify="center" item xs={6} sm={1} md={2}>
					<Paper component="form" className="color-output">
						<TextField fullWidth InputProps={{ readOnly: true }} label="Blended Color" value={blend} />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};
