import { css } from 'glamor';
import { TypeOptions } from 'react-toastify';

export const toastOptions = (hex: string, contrastColor: string, type: TypeOptions = 'success') => {
	return {
		autoClose: 1500,
		className: css({
			backgroundColor: hex,
			color: contrastColor,
			border: `1px solid ${contrastColor}`,
			textAlign: 'center',
		}).toString(),
		closeButton: false,
		containerId: 'toasts-container',
		type: type,
	};
};
