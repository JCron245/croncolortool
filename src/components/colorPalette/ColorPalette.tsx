import { FC, useState } from 'react';
import './colorPalette.scss';
import { Button, GridList, GridListTile, withStyles, InputBase } from '@material-ui/core';
import { random, TinyColor } from '@ctrl/tinycolor';
import { findContrastingColor } from '../../utils/findContrast';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import { copyColor } from '../../utils/copy';

const SWATCH_LIMIT = 8;
const WHITE = '#FFF';
const BLACK = '#000';

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
		{ value: '#0FADED', valid: true, contrast: BLACK },
		{ value: '#be0fed', valid: true, contrast: WHITE }, // #bd193c
		{ value: '#ed4f0f', valid: true, contrast: BLACK },
		{ value: '#3eed0f', valid: true, contrast: BLACK },
	]);
	const [btnContrast, setBtnContrast] = useState(BLACK);

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

	return (
		<>
			<GridList className="full-page" cols={swatches.length}>
				{swatches.map((swatch: any, index: number): any => {
					return (
						<CronGridListStyle
							key={`${swatch.value}-${index}`}
							style={{ backgroundColor: swatch.value, color: swatch.contrast, height: '100%' }}>
							<CronTextField value={swatch.value} onChange={(v: any) => updateSwatch(v, index)} />
							<CronButton
								onClick={() => copyColor(swatch.value, swatch.contrast, 'Color Palette')}
								title="Copy color"
								style={{ color: 'currentColor' }}>
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
		</>
	);
};
