import React, { ReactElement, Component } from 'react';
import chroma from 'chroma-js';
import '../scss/SwatchExtended.scss';
import tinycolor from 'tinycolor2';
import { HelpCircle } from 'react-feather';
import { OverlayPanel } from 'primereact/overlaypanel';
import strings from '../assets/strings.json';
import Utilities from '../utilities/utilities';
import ReactGA from 'react-ga';
import { SketchPicker } from 'react-color';

interface SwatchExtendedProps {
	color?: string;
}

interface SwatchExtendedState {
	isSingleClick?: boolean;
	colorString?: string;
	hexColorString?: string;
	rgbColorString?: string;
	hslColorString?: string;
	colorName?: string;
	contrastColorHex?: string;
	doubleContrast?: string;
	temperature?: number | string;
	lights?: string[];
	darks?: string[];
	saturation?: string[];
	desaturation?: string[];
	analogousCollection?: any[];
	monochromaticCollection?: any[];
	complement?: string[];
	splitComplementCollection?: any[];
	triadCollection?: any[];
	tetradCollection?: any[];
}

export class SwatchExtended extends Component<SwatchExtendedProps, SwatchExtendedState> {
	private singleClick: any;
	private pickerChangeLimiter: number = 0;

	constructor(props: any) {
		super(props);
		if (this.props.color) {
			this.state = this.buildStateObject(this.props.color);
		}
	}

	buildStateObject = (color: string): any => {
		let colorString: string = color.charAt(0) === '#' ? color.substr(1) : color;
		// Chroma Object
		let chromaColor = chroma(color);
		// Color Name If It Has One
		let colorName = chromaColor.name();
		// Color Hex
		let colorHex = chromaColor.hex();
		// Contrast Colors in HEX
		let contrastColorHex: string = Utilities.findContrastingColor(colorString);
		// Color temperature
		let colorTemperature: number = chroma(colorString).temperature();
		// brighten

		let stateObj: SwatchExtendedState = {
			isSingleClick: false,
			colorString: colorString,
			hexColorString: colorHex,
			rgbColorString: chromaColor
				.rgb()
				.toString()
				.replace(/,/g, ', '),
			hslColorString: Utilities.trimHSL(chromaColor.hsl()),
			colorName: colorName !== colorHex ? colorName : undefined,
			contrastColorHex: contrastColorHex,
			doubleContrast: Utilities.findContrastingColor(contrastColorHex),
			temperature: colorTemperature <= 30000 ? colorTemperature : undefined,
			lights: this.createLightArray(color),
			darks: this.createDarkArray(color),
			saturation: this.createSaturationArray(color),
			desaturation: this.createDesaturationArray(color),
			analogousCollection: tinycolor(colorHex).analogous(),
			monochromaticCollection: tinycolor(colorHex).monochromatic(),
			complement: [
				colorHex,
				tinycolor(colorHex)
					.complement()
					.toHexString()
			],
			splitComplementCollection: tinycolor(colorHex).splitcomplement(),
			triadCollection: tinycolor(colorHex).triad(),
			tetradCollection: tinycolor(colorHex).tetrad()
		};
		return stateObj;
	};

	createLightArray = (color: string): any[] => {
		let shades = [];
		for (let i = 0; i < 15; i++) {
			let lightened = tinycolor(color)
				.lighten(i * 7.5)
				.toHexString();
			shades.push(lightened);
			if (lightened === '#ffffff') {
				break;
			}
		}
		return shades;
	};

	createDarkArray = (color: string): any[] => {
		let shades = [];
		for (let i = 0; i < 15; i++) {
			let darkened = tinycolor(color)
				.darken(i * 7.5)
				.toHexString();
			shades.push(darkened);
			if (darkened === '#000000') {
				break;
			}
		}
		return shades;
	};

	createSaturationArray = (color: string): any[] => {
		let shades: any[] = [];
		for (let i = 0; i < 15; i++) {
			let saturated = tinycolor(color)
				.saturate(i * 7.5)
				.toHexString();
			if (i !== 0 && saturated === shades[i - 1]) {
				break;
			}
			shades.push(saturated);
		}
		return shades;
	};

	createDesaturationArray = (color: string): any[] => {
		let shades: any[] = [];
		for (let i = 0; i < 15; i++) {
			let desaturated = tinycolor(color)
				.desaturate(i * 7.5)
				.toHexString();
			if (i !== 0 && desaturated === shades[i - 1]) {
				break;
			}
			shades.push(desaturated);
		}
		return shades;
	};

	handleChangeLimited = (event: any): void => {
		this.pickerChangeLimiter++;
		if (this.pickerChangeLimiter % 3 === 0) {
			return;
		} else {
			this.handleChange(event);
		}
	};

	handleChange = (event: any): void => {
		let isValid = chroma.valid(event.hex);
		if (isValid) {
			ReactGA.event({
				category: 'Swatch - Single',
				action: 'Color Change'
			});
			this.setState(this.buildStateObject(event.hex));
		}
	};

	InfoBox = (props: any) => {
		let op: OverlayPanel | null;
		if (props.value) {
			return (
				<div className="InfoBox">
					<HelpCircle className="helpCircle" onClick={e => (op ? op.toggle(e) : 0)} />
					<OverlayPanel ref={el => (op = el)}>
						<p>
							<span>{props.label}</span>
							<br />
							<br />
							{props.info}
						</p>
					</OverlayPanel>
					<label>
						{props.label}:
						<input readOnly value={props.value} className="infoReadonlyInput" type="text" />
					</label>
				</div>
			);
		}
		return null;
	};

	// ColorBox = (arr: any[], label: string, info?: string) => {
	ColorBox = (props: any) => {
		if (props) {
			let boxContents = [];
			let op: OverlayPanel | null;

			for (let i = 0; i < props.array.length; i++) {
				let item = typeof props.array[i] === 'string' ? props.array[i] : props.array[i].toHexString();
				boxContents.push(<this.ColorBar color={item} key={i} />);
			}

			return (
				<div className="barGroup">
					<div className="barGroupInner">
						<HelpCircle className="helpCircle" onClick={e => (op ? op.toggle(e) : 0)} />
						<OverlayPanel ref={el => (op = el)}>
							<p>
								<span>{props.label}</span>
								<br />
								<br />
								{props.info}
							</p>
						</OverlayPanel>
						{props.label}
					</div>
					{boxContents}
				</div>
			);
		}
		return null;
	};

	ColorBar = (props: any) => {
		return (
			<label title={`Hex Color ${props.color}`} aria-label={`Hex Color ${props.color}`}>
				<input
					readOnly
					style={{ backgroundColor: props.color, color: Utilities.findContrastingColor(props.color) }}
					value={props.color}
					className="infoReadonlyInput"
					onClick={this.SingleClick}
					onDoubleClick={this.DoubleClick}
				/>
			</label>
		);
	};

	SingleClick = (event: React.MouseEvent) => {
		/** React does some interesting stuff with "synthetic events" */
		let savedEvent = event;
		let savedTarget = savedEvent.currentTarget as HTMLInputElement;
		/**/
		this.singleClick = true;
		setTimeout(() => {
			if (this.singleClick) {
				navigator.clipboard.writeText(savedTarget.value);
			}
		}, 275);
	};

	DoubleClick = (event: React.MouseEvent): void => {
		event.stopPropagation();
		this.singleClick = false;
		/** React does some interesting stuff with "synthetic events" */
		let savedEvent = event;
		let savedTarget = savedEvent.currentTarget as HTMLInputElement;
		/**/
		this.setState(this.buildStateObject(savedTarget.value));
	};

	public render(): ReactElement {
		let colorStyle: React.CSSProperties = {
			backgroundColor: this.state.hexColorString
		};

		return (
			<div className="swatchExtended">
				<section style={colorStyle} className="color" />
				<SketchPicker
					disableAlpha={true}
					color={this.state.hexColorString}
					onChange={this.handleChangeLimited}
					onChangeComplete={this.handleChange}
				/>
				<aside className="info">
					<div className="additional">
						<this.InfoBox label="NAME" value={this.state.colorName} />
						<this.InfoBox label="HEX" value={this.state.hexColorString} />
						<this.InfoBox label="HSL" value={this.state.hslColorString} />
						<this.InfoBox label="TEMPERATURE" value={this.state.temperature} />
					</div>
					<div className="boxes">
						<this.ColorBox array={this.state.lights} label="Lighter" />
						<this.ColorBox array={this.state.darks} label="Darker" />
						<this.ColorBox array={this.state.saturation} label="Saturated" info={strings.saturated.en.description} />
						<this.ColorBox array={this.state.desaturation} label="Desaturated" info={strings.desaturation.en.description} />
						<this.ColorBox array={this.state.complement} label="Complementary" info={strings.complementary.en.description} />
						<this.ColorBox array={this.state.splitComplementCollection} label="Split Complement" info={strings.split.en.description} />
						<this.ColorBox array={this.state.triadCollection} label="Triadic" info={strings.triadic.en.description} />
						<this.ColorBox array={this.state.tetradCollection} label="Tetradic" info={strings.tetradic.en.description} />
						<this.ColorBox array={this.state.monochromaticCollection} label="Monochromatic" info={strings.monochromatic.en.description} />
						<this.ColorBox array={this.state.analogousCollection} label="Analgous" info={strings.analgous.en.description} />
					</div>
				</aside>
			</div>
		);
	}
}
