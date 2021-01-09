import { FC, memo } from 'react';
import './swatchBar.scss';

interface SwatchBarProps {
	contrastColor: string;
	groupName: string;
	hex: string;
	onClick: (hex: string, contrastColor: string) => void;
	showLabels: boolean;
	showValue: string;
}

export const SwatchBar: FC<SwatchBarProps> = memo((props: SwatchBarProps) => {
	const { contrastColor, groupName, hex, onClick, showLabels, showValue } = props;
	const ariaLabel = `Select to copy ${showValue} to your clipboard`;
	const labelledby = `${groupName.replace(' ', '-')}-swatch`;
	const label = showLabels ? showValue : '';

	const handleClick = () => {
		onClick(hex, contrastColor);
	};

	const swatchBarStyle = {
		backgroundColor: hex,
		color: contrastColor,
	};

	return (
		<li className="color-bar">
			<button
				aria-label={ariaLabel}
				aria-labelledby={labelledby}
				className="color-bar-button"
				onClick={handleClick}
				style={swatchBarStyle}
				type="button"
				value={showValue}>
				{label}
			</button>
		</li>
	);
});
