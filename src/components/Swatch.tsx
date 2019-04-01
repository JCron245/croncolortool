import React, { ReactElement, Component } from 'react';
import chroma from 'chroma-js';
import { Accordion, AccordionTab } from 'primereact/accordion';
import '../scss/Swatch.scss';
import ReactDOM from 'react-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Button } from 'primereact/button';

interface SwatchProps {
	color?: string;
	count?: number;
}

interface SwatchState {
	colorString?: string;
	hexColorString?: string;
	value?: string;
	rgbColorString?: string;
	hslColorString?: string;
	colorName?: string;
	contrastColorHex?: string;
	contrastColorRGB?: string;
	doubleContrast?: string;
	count?: number;
}

export class Swatch extends Component<SwatchProps, SwatchState> {
	constructor(props: any) {
		super(props);
		if (this.props.color) {
			this.state = this.buildStateObject(this.props.color, this.props.count);
		}
	}

	static getDerivedStateFromProps(props: any, state: any): any {
		if (props.count !== state.count) {
			return {
				count: props.count
			};
		}
		return null;
	}

	buildStateObject(color: string, count?: number): any {
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
		let stateObj: SwatchState = {
			colorString: colorString,
			hexColorString: chromaColor.hex(),
			value: colorString,
			rgbColorString: chromaColor.rgb().toString(),
			hslColorString: this.trimHSL(chromaColor.hsl()),
			colorName: colorName !== chromaColor.hex() ? colorName : '',
			contrastColorHex: contrastColorHex,
			contrastColorRGB: contrastColorRGB,
			doubleContrast: this.findContrastingColor(contrastColorHex),
			count: count ? count : this.props.count
		};
		this.updateContrastStyle(contrastColorHex);
		return stateObj;
	}

	updateContrastStyle(contrastColor: string): void {
		try {
			const node = ReactDOM.findDOMNode(this);
			if (node instanceof HTMLElement) {
				const child = node.querySelector('a[role=tab]') as HTMLElement;
				if (child) {
					child.style.color = contrastColor || '';
				}
			}
		} catch (e) {
			// ignore for now
		}
	}

	trimHSL(hslArr: number[]): string {
		let arr = hslArr.map(function(val) {
			return Number(val.toFixed(2));
		});
		return arr.toString();
	}

	componentDidMount(): void {
		this.updateContrastStyle(this.state.contrastColorHex || '');
	}

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

	findContrastingColor = (color: string) => {
		let array = [
			{ hex: '#EFEFEA', contrast: chroma.contrast(color, '#EFEFEA') },
			{ hex: '#10100A', contrast: chroma.contrast(color, '#10100A') }
		];
		array = array.sort(
			(a: { hex: string; contrast: number }, b: { hex: string; contrast: number }) => {
				if (a.contrast > b.contrast) return -1;
				if (a.contrast < b.contrast) return 1;
				return 0;
			}
		);
		return array[0].hex;
	};

	stopProp = (event: any) => {
		event.preventDefault();
		event.stopPropagation();
	};

	public render(): ReactElement {
		let swatchStyle: React.CSSProperties = {
			backgroundColor: this.state.hexColorString
		};

		let inputStyle: React.CSSProperties = {
			backgroundColor: this.state.hexColorString,
			color: this.state.contrastColorHex
		};

		let gridStyle: React.CSSProperties = {
			color: this.state.doubleContrast,
			backgroundColor: `rgba(${this.state.contrastColorRGB},.95)`
		};

		if (this.state.count) {
			if (this.state.count < 5) {
				gridStyle.gridTemplateColumns = '25% 75%';
			} else {
				gridStyle.gridTemplateColumns = '100%';
				gridStyle.gridTemplateRows = '1fr';
			}
		}

		return (
			<div style={swatchStyle} className="swatch">
				<Accordion>
					<AccordionTab
						headerClassName="accordionHeader"
						contentClassName="accordionContent"
						header={
							<input
								spellCheck={false}
								size={this.state.value ? this.state.value.length : 1}
								style={inputStyle}
								value={this.state.value}
								onClick={this.stopProp}
								onChange={this.handleChange}
								className="colorInput"
							/>
						}>
						<dl className="grid" style={gridStyle}>
							{this.state.colorName !== '' && <dt className="gridKey">Name:</dt>}
							{this.state.colorName !== '' && (
								<dd className="gridValue">
									<span>{this.state.colorName}</span>
								</dd>
							)}
							<dt className="gridKey">Hex:</dt>
							<dd className="gridValue">
								<span>{this.state.hexColorString}</span>
								<CopyToClipboard
									text={
										this.state.hexColorString ? this.state.hexColorString.substr(1) : ''
									}>
									<Button
										className="copyButton"
										title="Click To Copy Hex"
										icon="pi pi-check"
									/>
								</CopyToClipboard>
								<CopyToClipboard text={this.state.hexColorString || ''}>
									<Button
										label="hex#"
										className="copyButton"
										title={`Click To Copy Hex CSS - ${this.state.hexColorString}`}
									/>
								</CopyToClipboard>
							</dd>
							<dt className="gridKey">RGB:</dt>
							<dd className="gridValue">
								<span>{this.state.rgbColorString}</span>
								<CopyToClipboard text={this.state.rgbColorString || ''}>
									<Button
										className="copyButton"
										title="Click To Copy RGB"
										icon="pi pi-check"
									/>
								</CopyToClipboard>
								<CopyToClipboard text={`rgb(${this.state.rgbColorString})` || ''}>
									<Button
										label="rgb()"
										className="copyButton"
										title={`Click To Copy RGB CSS - rgb(${this.state.rgbColorString})`}
									/>
								</CopyToClipboard>
							</dd>
							<dt className="gridKey">HSL:</dt>
							<dd className="gridValue">
								<span>{this.state.hslColorString}</span>
								<CopyToClipboard text={this.state.hslColorString || ''}>
									<Button
										className="copyButton"
										title="Click To Copy HSL"
										icon="pi pi-check"
									/>
								</CopyToClipboard>
								<CopyToClipboard text={`hsl(${this.state.hslColorString})` || ''}>
									<Button
										label="hsl()"
										className="copyButton"
										title={`Click To Copy HSL CSS - hsl(${this.state.hslColorString})`}
									/>
								</CopyToClipboard>
							</dd>
						</dl>
					</AccordionTab>
				</Accordion>
			</div>
		);
	}
}

export default Swatch;
