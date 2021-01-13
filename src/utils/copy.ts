import copy from 'clipboard-copy';
import { toast } from 'react-toastify';
import { copyEvent } from '../components/routes/Tracker';
import { toastOptions } from './getToastOptions';

export const copyColor = (color: any, contrastColor: string, gaCategory: string): Promise<boolean> => {
	return copy(color).then(
		() => {
			copyEvent(true, gaCategory, color);
			toast(`${color} copied to clipboard!`, toastOptions(color, contrastColor));
			return true;
		},
		() => {
			copyEvent(false, gaCategory, color);
			toast(`${color} failed to copy!`, toastOptions(color, contrastColor));
			return false;
		}
	);
};
