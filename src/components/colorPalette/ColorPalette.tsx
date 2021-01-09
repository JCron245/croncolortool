/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useCallback } from 'react';
import './colorPalette.scss';
import { Button, GridList, GridListTile, withStyles, InputBase } from '@material-ui/core';
import { random, TinyColor } from '@ctrl/tinycolor';
import { findContrastingColor } from '../../utils/findContrast';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import copy from 'clipboard-copy';
import { toast } from 'react-toastify';
import { toastOptions } from '../../utils/getToastOptions';

const SWATCH_LIMIT = 8;

const CronTextField = withStyles({
	root: {
		color: 'currentColor',
		height: '3rem',
		padding: '.25rem',
		width: '100%',
	},
	input: {
		color: 'currentColor',
		textAlign: 'center',
		borderBottom: '2px solid currentColor',
		height: '4ch,',
	},
})(InputBase);

const CronGridListStyle = withStyles({
	tile: {
		display: 'flex',
		justifyContent: 'space-between',
		height: 'fit-content',
		flexWrap: 'wrap',
	},
})(GridListTile);

const CronButton = withStyles({
	root: {
		height: '3rem',
		padding: 0,
	},
})(Button);

export const Palette: FC = () => {
	const [swatches, setSwatches] = useState<any>([
		{ value: '#0FADED', valid: true, contrast: '#000' },
		{ value: '#be0fed', valid: true, contrast: '#FFF' },
		{ value: '#ed4f0f', valid: true, contrast: '#000' },
		{ value: '#3eed0f', valid: true, contrast: '#000' },
	]);
	const [btnContrast, setBtnContrast] = useState('#000');

	const addSwatch = () => {
		if (swatches.length >= SWATCH_LIMIT) return;
		const newColor = random().toHex8String();
		const newColorContrast = findContrastingColor(newColor);
		setSwatches([...swatches, { value: newColor, valid: true, contrast: newColorContrast }]);
		setBtnContrast(newColorContrast);
	};

	const updateSwatch = (newVal: any, index: number) => {
		const value = newVal.target.value;
		const valid = new TinyColor(value).isValid;
		const swatchCopy = JSON.parse(JSON.stringify(swatches));
		const contrast = valid ? findContrastingColor(value) : value.length === 0 ? '#0FADED' : swatchCopy[index].contrast;
		swatchCopy[index] = { value, valid, contrast };
		setSwatches(swatchCopy);
		if (index === swatchCopy.length - 1) {
			setBtnContrast(contrast);
		}
	};

	const deleteSwatch = (index: number) => {
		let swatchCopy = JSON.parse(JSON.stringify(swatches));
		swatchCopy.splice(index, 1);
		setSwatches(swatchCopy);
		setBtnContrast(swatchCopy[swatchCopy.length - 1].contrast);
	};

	const copyColor = useCallback((color: any, contrastColor: string) => {
		copy(color).then(
			() => {
				toast(`${color} copied to clipboard!`, toastOptions(color, contrastColor));
			},
			() => {
				toast(`${color} failed to copy!`, toastOptions(color, contrastColor));
			}
		);
	}, []);

	return (
		<div className="color-palette">
			<GridList style={{ height: '100%', width: '100%' }} cols={swatches.length}>
				{swatches.map((swatch: any, index: number): any => {
					return (
						<CronGridListStyle style={{ backgroundColor: swatch.value, color: swatch.contrast, height: '100%' }}>
							<CronTextField value={swatch.value} onChange={(v: any) => updateSwatch(v, index)} />
							<CronButton onClick={() => copyColor(swatch.value, swatch.contrast)} title="Copy color" style={{ color: 'currentColor' }}>
								<FileCopyIcon />
							</CronButton>
							{swatches.length > 1 && (
								<CronButton onClick={() => deleteSwatch(index)} title="Delete color swatch" style={{ color: 'currentColor' }}>
									<DeleteIcon />
								</CronButton>
							)}
						</CronGridListStyle>
					);
				})}
			</GridList>
			<Button
				title="Add Another Swatch"
				onClick={addSwatch}
				variant="outlined"
				disabled={swatches.length >= SWATCH_LIMIT}
				style={{
					position: 'fixed',
					right: '1rem',
					bottom: '1rem',
					color: btnContrast,
					borderColor: btnContrast,
				}}>
				Add
			</Button>
		</div>
	);
};
