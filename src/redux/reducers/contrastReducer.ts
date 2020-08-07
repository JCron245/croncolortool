import { ContrastCheck } from '../interfaces';

const initialState: ContrastCheck = {
	backgroundColor: '#eeeed6',
	textColor: '#15140f',
	ratio: 15.66,
	wcagPasses: {
		small: { aa: true, aaa: true },
		large: { aa: true, aaa: true },
	},
};

export function contrastReducer(state = initialState, action: any) {
	switch (action.type) {
		case 'SET_COLORS':
			return {
				...state,
				backgroundColor: action.backgroundColor,
				textColor: action.textColor,
				ratio: action.ratio,
				wcagPasses: action.wcagPasses,
			};
		default:
			return state;
	}
}

export default contrastReducer;
