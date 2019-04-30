import React, { ReactElement, Component } from 'react';
import chroma from 'chroma-js';
import '../scss/SwatchExtended.scss';

interface SwatchExtendedProps {
	color?: string;
}

interface SwatchExtendedState {
	colorString?: string;
	hexColorString?: string;
	value?: string;
	rgbColorString?: string;
	hslColorString?: string;
	colorName?: string;
	contrastColorHex?: string;
	contrastColorRGB?: string;
	doubleContrast?: string;
	temperature?: number | string;
	brights?: any;
	saturation?: any;
}

export class SwatchExtended extends Component<SwatchExtendedProps, SwatchExtendedState> {
	constructor(props: any) {
		super(props);
		if (this.props.color) {
			this.state = this.buildStateObject(this.props.color);
		}
	}

	buildStateObject = (color: string): any => {
		let colorString: string;
		if (color.charAt(0) === '#') {
			colorString = color.substr(1);
		} else {
			colorString = color;
		}
		// Chroma Object
		let chromaColor = chroma(color);
		// Color Name If It Has One
		let colorName = chromaColor.name();
		// Contrast Colors in HEX and RGB
		let contrastColorHex: string = this.findContrastingColor(colorString);
		let contrastColorRGB: string = chroma(contrastColorHex)
			.rgb()
			.toString();
		// Color temperature
		let colorTemperature: number = chroma(colorString).temperature();
		// brighten

		let stateObj: SwatchExtendedState = {
			colorString: colorString,
			hexColorString: chromaColor.hex(),
			value: colorString,
			rgbColorString: chromaColor
				.rgb()
				.toString()
				.replace(/,/g, ', '),
			hslColorString: this.trimHSL(chromaColor.hsl()),
			colorName: colorName !== chromaColor.hex() ? colorName : undefined,
			contrastColorHex: contrastColorHex,
			contrastColorRGB: contrastColorRGB,
			doubleContrast: this.findContrastingColor(contrastColorHex),
			temperature: colorTemperature <= 30000 ? colorTemperature : undefined,
			brights: this.createShadeArray(color, chromaColor.hex()),
			saturation: this.createSaturationArray(color, chromaColor.hex())
		};
		return stateObj;
	};

	createShadeArray = (color: string, hex: string): any[] => {
		let shades = [];
		for (let i = 0.5; i < 10; i += 1) {
			let shade = chroma(color)
				.brighten(i)
				.toString();
			if (shade === '#ffffff') {
				shades.push(shade);
				break;
			}
			shades.push(shade);
		}
		shades = shades.reverse();
		shades.push(hex);
		for (let i = 0.5; i < 10; i += 1) {
			let shade = chroma(color)
				.darken(i)
				.toString();
			if (shade === '#000000') {
				shades.push(shade);
				break;
			}
			shades.push(shade);
		}

		return shades;
	};

	createSaturationArray = (color: string, hex: string): any[] => {
		let colors = [];
		let iter = 0.5;
		for (let i = iter; i < 10; i += iter) {
			let desat = chroma(color)
				.desaturate(i)
				.toString();
			let deltaE = chroma.deltaE(
				desat,
				chroma(color)
					.desaturate(i - iter >= 0 ? i - iter : 0)
					.toString()
			);
			console.log(desat, deltaE);
			if (desat === '#000000' ||  (i !== iter && deltaE < 1.25) || desat === hex) {
				break;
			}
			colors.push(desat);
		}
		colors = colors.reverse();
		colors.push(hex);
		for (let i = iter; i < 10; i += iter) {
			let sat = chroma(color)
				.saturate(i)
				.toString();
			let deltaE = chroma.deltaE(
				sat,
				chroma(color)
					.saturate(i - iter >= 0 ? i - iter : 0)
					.toString()
			);
			console.log(sat, deltaE);
			if (sat === '#ffffff' || (i !== iter && deltaE < 1.25) || sat === hex) {
				break;
			}
			colors.push(sat);
		}
		return colors;
	};

	findContrastingColor = (color: string): string => {
		const lightContrast = chroma.contrast(color, '#E1DDD7');
		const darkContrast = chroma.contrast(color, '#161d1d');
		return lightContrast > darkContrast ? '#E1DDD7' : '#161d1d';
	};

	trimHSL = (hslArr: number[]): string => {
		let arr = hslArr.map((val: number) => {
			// Something is wrong with chroma and occasionally I am seeing
			// a nan value here. Upon investigation it seems to only occur sometimes
			// when the HUE value is 0, thus intercepting here and converting it to a 0
			// this will require further testing to ensure our HSL values are accurate!
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
				value: event.target.value
			});
		}
	};

	ShadeBar = (props: any) => {
		const color = this.state.brights ? this.state.brights[props.num] : null;
		return (
			<label>
				<input
					readOnly
					style={{ backgroundColor: color, color: this.findContrastingColor(color) }}
					value={color}
					className="infoReadonlyInput"
				/>
			</label>
		);
	};

	ShadeBox = () => {
		let boxContents = [];
		for (let i = 0; i < this.state.brights.length; i++) {
			boxContents.push(<this.ShadeBar num={i} key={i} />);
		}
		return <div className="lightAndDark"><p>Brightened</p>{boxContents}<p>Darkened</p></div>;
	};

	SaturationBar = (props: any) => {
		return (
			<label>
				<input
					readOnly
					style={{ backgroundColor: this.state.saturation[props.num], color: this.findContrastingColor(this.state.saturation[props.num]) }}
					value={this.state.saturation[props.num]}
					className="infoReadonlyInput"
				/>
			</label>
		);
	};

	SaturationBox = () => {
		let boxContents = [];
		for (let i = 0; i < this.state.saturation.length; i++) {
			boxContents.push(<this.SaturationBar num={i} key={i} />);
		}
		return <div className="saturations"><p>Desaturated</p>{boxContents}<p>Saturated</p></div>;
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
						<input spellCheck={false} style={inputStyle} value={this.state.value} onChange={this.handleChange} className="colorInput" />
					</label>
					<this.InfoBox label="Name" value={this.state.colorName} />
					<this.InfoBox label="HEX" value={this.state.hexColorString} />
					<this.InfoBox label="RGB" value={this.state.rgbColorString} />
					<this.InfoBox label="HSL" value={this.state.hslColorString} />
					<this.InfoBox label="Temperature" value={this.state.temperature} />
					{/*Create our column of 'shades'? */}
					<div className="boxes">
						{this.ShadeBox()}
						{this.SaturationBox()}
					</div>
				</aside>
			</div>
		);
	}
}
