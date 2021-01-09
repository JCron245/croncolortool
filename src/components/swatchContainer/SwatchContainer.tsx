import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/interfaces';
import { Swatch } from '../swatch/Swatch';
import { ColorSets } from '../../utils/colorToolUtils';

export const SwatchContainer: FC = () => {
	const colorArrays: ColorSets = useSelector((store: RootState) => store.color.colorSets);
	const showLabels: boolean = useSelector((store: RootState) => store.color.showLabels);

	return (
		<>
			<Swatch name="lighter" showLabels={showLabels} colors={colorArrays?.lighter} />
			<Swatch name="darker" showLabels={showLabels} colors={colorArrays?.darker} />
			<Swatch name="tint" showLabels={showLabels} colors={colorArrays?.tint} />
			<Swatch name="shade" showLabels={showLabels} colors={colorArrays?.shade} />
			<Swatch name="saturated" showLabels={showLabels} colors={colorArrays?.saturated} />
			<Swatch name="desaturated" showLabels={showLabels} colors={colorArrays?.desaturated} />
			<Swatch name="analogous" showLabels={showLabels} colors={colorArrays?.analogous} />
			<Swatch name="complementary" showLabels={showLabels} colors={colorArrays?.complementary} />
			<Swatch name="split complement" showLabels={showLabels} colors={colorArrays?.split} />
			<Swatch name="triadic" showLabels={showLabels} colors={colorArrays?.triadic} />
			<Swatch name="tetradic" showLabels={showLabels} colors={colorArrays?.tetradic} />
			<Swatch name="monochromatic" showLabels={showLabels} colors={colorArrays?.monochromatic} />
		</>
	);
};
