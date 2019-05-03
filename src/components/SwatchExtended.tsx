import React, { ReactElement, Component } from 'react';
import chroma from 'chroma-js';
import '../scss/SwatchExtended.scss';
import tinycolor from 'tinycolor2';
import { HelpCircle } from 'react-feather';
import { OverlayPanel } from 'primereact/overlaypanel';
import strings from '../assets/strings.json';

interface SwatchExtendedProps {
	color?: string;
}

interface SwatchExtendedState {
	isSingleClick?: boolean;
	colorString?: string;
	hexColorString?: string;
	inputValue?: string;
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
		let contrastColorHex: string = this.findContrastingColor(colorString);
		// Color temperature
		let colorTemperature: number = chroma(colorString).temperature();
		// brighten

		let stateObj: SwatchExtendedState = {
			isSingleClick: false,
			colorString: colorString,
			hexColorString: colorHex,
			inputValue: colorString,
			rgbColorString: chromaColor
				.rgb()
				.toString()
				.replace(/,/g, ', '),
			hslColorString: this.trimHSL(chromaColor.hsl()),
			colorName: colorName !== colorHex ? colorName : undefined,
			contrastColorHex: contrastColorHex,
			doubleContrast: this.findContrastingColor(contrastColorHex),
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
				.lighten(i * 5)
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
				.darken(i * 5)
				.toHexString();
			shades.push(darkened);
			if (darkened === '#000000') {
				break;
			}
		}
		return shades;
	};

	createSaturationArray = (color: string): any[] => {
		let shades: any[] | string[] = [];
		for (let i = 0; i < 15; i++) {
			let saturated = tinycolor(color)
				.saturate(i * 10)
				.toHexString();
			if (i !== 0 && saturated === shades[i - 1]) {
				break;
			}
			shades.push(saturated);
		}
		return shades;
	};

	createDesaturationArray = (color: string): any[] => {
		let shades: any[] | string[] = [];
		for (let i = 0; i < 15; i++) {
			let desaturated = tinycolor(color)
				.desaturate(i * 10)
				.toHexString();
			if (i !== 0 && desaturated === shades[i - 1]) {
				break;
			}
			shades.push(desaturated);
		}
		return shades;
	};

	findContrastingColor = (color: string): string => {
		const lightContrast = chroma.contrast(color, '#F7F6F4');
		const darkContrast = chroma.contrast(color, '#0B0E0E');
		return lightContrast > darkContrast ? '#F7F6F4' : '#0B0E0E';
	};

	trimHSL = (hslArr: number[]): string => {
		let arr = hslArr.map((val: number) => {
			// Something is wrong with chroma and occasionally I am seeing a nan value here. Upon investigation it seems to only occur sometimes
			// when the HUE value is 0, thus intercepting here and converting it to a 0 this will require further testing to ensure our HSL values are accurate!
			if (isNaN(val)) {
				val = 0;
			}
			return Number(val.toFixed(2));
		});
		return arr.toString().replace(/,/g, ', ');
	};

	handleChange = (event: any): void => {
		let isValid = chroma.valid(event.target.value);
		if (isValid) {
			this.setState(this.buildStateObject(event.target.value));
		} else {
			this.setState({
				inputValue: event.target.value
			});
		}
	};

	InfoBox = (props: any) => {
		if (props.value) {
			return (
				<label>
					{props.label}:
					<input readOnly value={props.value} className="infoReadonlyInput" type="text" />
				</label>
			);
		}
		return null;
	};

	ColorBox = (arr: any[], label: string, info?: string) => {
		let boxContents = [];
		let op: OverlayPanel | null;

		for (let i = 0; i < arr.length; i++) {
			let item = typeof arr[i] === 'string' ? arr[i] : arr[i].toHexString();
			boxContents.push(<this.ColorBar color={item} key={i} />);
		}

		return (
			<div className="barGroup">
				<div className="barGroupInner">
					<HelpCircle className="helpCircle" onClick={e => (op ? op.toggle(e) : 0)} />
					<OverlayPanel ref={el => (op = el)}>
						<p>
							<span>{label}</span>
							<br />
							{info}
						</p>
					</OverlayPanel>
					{label}
				</div>
				{boxContents}
			</div>
		);
	};

	ColorBar = (props: any) => {
		return (
			<label>
				<input
					readOnly
					style={{ backgroundColor: props.color, color: this.findContrastingColor(props.color) }}
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
		this.singleClick = false;
		/** React does some interesting stuff with "synthetic events" */
		let savedEvent = event;
		let savedTarget = savedEvent.currentTarget as HTMLInputElement;
		/**/
		this.setState( this.buildStateObject(savedTarget.value))
	};

	public render(): ReactElement {
		let colorStyle: React.CSSProperties = {
			backgroundColor: this.state.hexColorString
		};

		let inputStyle: React.CSSProperties = {
			backgroundColor: this.state.hexColorString,
			color: this.state.contrastColorHex
		};

		return (
			<div className="swatchExtended">
				<section style={colorStyle} className="color" />
				<aside className="info">
					<label>
						<input
							spellCheck={false}
							style={inputStyle}
							value={this.state.inputValue}
							onChange={this.handleChange}
							className="colorInput"
						/>
					</label>
					<this.InfoBox label="NAME" value={this.state.colorName} />
					<this.InfoBox label="HEX" value={this.state.hexColorString} />
					<this.InfoBox label="RGB" value={this.state.rgbColorString} />
					<this.InfoBox label="HSL" value={this.state.hslColorString} />
					<this.InfoBox label="TEMPERATURE" value={this.state.temperature} />
					<div className="boxes">
						{this.ColorBox(this.state.lights || [], 'Lighter')}
						{this.ColorBox(this.state.darks || [], 'Darker')}
						{this.ColorBox(this.state.saturation || [], 'Saturated', strings.saturated.en.description)}
						{this.ColorBox(this.state.desaturation || [], 'Desaturated', strings.desaturation.en.description)}
						{this.ColorBox(this.state.monochromaticCollection || [], 'Monochromatic', strings.monochromatic.en.description)}
						{this.ColorBox(this.state.analogousCollection || [], 'Analgous', strings.analgous.en.description)}
						{this.ColorBox(this.state.complement || [], 'Complementary', strings.complementary.en.description)}
						{this.ColorBox(this.state.splitComplementCollection || [], 'Split Complement', strings.split.en.description)}
						{this.ColorBox(this.state.triadCollection || [], 'Triadic', strings.triadic.en.description)}
						{this.ColorBox(this.state.tetradCollection || [], 'Tetradic', strings.tetradic.en.description)}
					</div>
				</aside>
			</div>
		);
	}
}
