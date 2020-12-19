import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core';

export const CronSlider = withStyles({
	rail: {
		height: 8,
		borderRadius: 0,
	},
	root: {
		boxShadow: '0 0 16px 2px rgba(255, 255, 255, .07)',
		color: 'transparent',
		height: 8,
		padding: 0,
	},
	thumb: {
		backgroundColor: '#fff',
		border: '2px solid currentColor',
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
		color: '#000',
		height: 24,
		marginTop: -8,
		width: 24,
	},
	track: {
		height: 8,
		borderRadius: 0,
	},
	valueLabel: {
		color: '#FFF',
		left: 'calc(-50% + 4px)',
	},
})(Slider);
