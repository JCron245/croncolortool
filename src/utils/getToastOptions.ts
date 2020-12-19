import { css } from 'glamor';
import { TypeOptions } from 'react-toastify';

export const toastOptions = (hex: string, contrastColor: string, type: TypeOptions = 'success') => {
	return {
		containerId: 'toasts-container',
		autoClose: 1500,
		closeButton: false,
		type: type,
		className: css({
			backgroundColor: hex,
			color: contrastColor,
			border: `1px solid ${contrastColor}`,
			textAlign: 'center',
		}).toString(),
	};
};
