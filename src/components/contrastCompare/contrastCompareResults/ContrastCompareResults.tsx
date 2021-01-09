import { FC } from 'react';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

export interface ContrastResults {
	contrastRatio: number;
	largeAA: boolean;
	largeAAA: boolean;
	smallAA: boolean;
	smallAAA: boolean;
}

const GREEN = '#4BD878';
const RED = '#FF8486';
const YELLOW = '#FFF08F';

export const ContrastCompareResults: FC<ContrastResults> = (props: ContrastResults) => {
	const { contrastRatio, largeAA, largeAAA, smallAA, smallAAA } = props;
	const colorRating = contrastRatio >= 7 ? GREEN : contrastRatio >= 3 ? YELLOW : RED;

	return (
		<FormControl component="form">
			<FormLabel>
				Contrast Ratio: <span style={{ color: colorRating }}>{Number(contrastRatio).toFixed(2)}</span>
			</FormLabel>
			<FormGroup row>
				<FormControlLabel control={<Checkbox style={{ color: smallAA ? GREEN : RED }} checked={smallAA} />} label="AA Small Text" />
				<FormControlLabel control={<Checkbox style={{ color: smallAAA ? GREEN : RED }} checked={smallAAA} />} label="AAA Small Text" />
				<FormControlLabel control={<Checkbox style={{ color: largeAA ? GREEN : RED }} checked={largeAA} />} label="AA Large Text" />
				<FormControlLabel control={<Checkbox style={{ color: largeAAA ? GREEN : RED }} checked={largeAAA} />} label="AAA Large Text" />
			</FormGroup>
		</FormControl>
	);
};
