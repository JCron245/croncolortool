import React, { ReactElement, Component } from 'react';
import chroma from 'chroma-js';
import '../scss/Swatch.scss';
import ReactDOM from 'react-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import { ChevronDown, Clipboard, XSquare, RefreshCw } from 'react-feather';

interface SwatchProps {
	color?: string;
	remove?: any;
	randomize?: any;
	index?: number;
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
	show?: boolean;
	index?: number;
}

export class Swatch extends Component<SwatchProps, SwatchState> {
	constructor(props: any) {
		super(props);
		if (this.props.color) {
			this.state = this.buildStateObject(this.props.color);
		}
	}

	
	static getDerivedStateFromProps = (props: any, state: any) => {
		if (props.index !== state.index) {
			return {
				index: props.index
			};
		}
		if (props.color !== state.colorString) {
			return {
				colorString: props.color
			}
		}
		return null;
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.color !== this.props.color) {
			let newState = this.buildStateObject(this.props.color || '');
			this.setState( newState )
		}
	}

	buildStateObject(color: string): any {
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
			show: this.state ? (this.state.show ? this.state.show : false) : false,
			index: this.props.index
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
			{ hex: '#E1DDD7', contrast: chroma.contrast(color, '#E1DDD7') },
			{ hex: '#161d1d', contrast: chroma.contrast(color, '#161d1d') },
			{ hex: '#7C7D7A', contrast: chroma.contrast(color, '#7C7D7A') }
		];
		array = array.sort((a: { hex: string; contrast: number }, b: { hex: string; contrast: number }) => {
			if (a.contrast > b.contrast) return -1;
			if (a.contrast < b.contrast) return 1;
			return 0;
		});
		return array[0].hex;
	};

	stopProp = (event: any) => {
		event.stopPropagation();
	};

	public render(): ReactElement {
		let swatchStyle: React.CSSProperties = {
			backgroundColor: this.state.hexColorString
		};

		let contrastStyle: React.CSSProperties = {
			backgroundColor: this.state.hexColorString,
			color: this.state.contrastColorHex
		};

		let boxStyle: React.CSSProperties = {
			color: this.state.doubleContrast,
			backgroundColor: `rgba(${this.state.contrastColorRGB})`
		};

		let showClass = this.state.show ? 'box-inner box-open' : 'box-inner';
		let spinArrow = this.state.show ? 'spin' : '';

		return (
			<div style={swatchStyle} className="swatch">
				<div className="controls" style={contrastStyle}>
					<span onClick={ () => this.props.randomize(this.state.index)}>
						<RefreshCw />
					</span>
					{this.props.remove && <span onClick={ () => this.props.remove(this.state.index)}>
						<XSquare />
					</span>}
				</div>
				<div
					style={contrastStyle}
					className="box-outer"
					onClick={$event => {
						this.setState({ show: !this.state.show });
					}}>
					<div className="box-head">
						<div className="arrow">
							<ChevronDown className={spinArrow} />
						</div>
						<label onClick={this.stopProp}>
							hex:
							<input
								spellCheck={false}
								size={this.state.value ? this.state.value.length : 1}
								style={contrastStyle}
								value={this.state.value}
								onClick={this.stopProp}
								onChange={this.handleChange}
								className="colorInput"
							/>
						</label>
						<div onClick={this.stopProp}>
							<CopyToClipboard text={this.state.hexColorString ? this.state.hexColorString.substr(1) : ''}>
								<Clipboard />
							</CopyToClipboard>
						</div>
					</div>
					<div style={boxStyle} className={showClass} onClick={this.stopProp}>
						<dl style={boxStyle}>
							{this.state.colorName !== '' && <dt>Name:</dt>}
							{this.state.colorName !== '' && (
								<dd>
									<span>{this.state.colorName}</span>
								</dd>
							)}
							<dt>
								<span>Hex:</span>
								<span>{this.state.hexColorString}</span>
							</dt>
							<dd>
								<CopyToClipboard text={this.state.hexColorString ? this.state.hexColorString.substr(1) : ''}>
									<button title={`Click To Copy Hex - ${this.state.hexColorString ? this.state.hexColorString.substr(1) : ''}`}>
										<Clipboard />
									</button>
								</CopyToClipboard>
								<CopyToClipboard text={this.state.hexColorString || ''}>
									<button title={`Click To Copy Hex CSS - ${this.state.hexColorString}`}>
										hex#
										<Clipboard />
									</button>
								</CopyToClipboard>
							</dd>
							<dt>
								<span>RGB:</span>
								<span>{this.state.rgbColorString}</span>
							</dt>
							<dd>
								<CopyToClipboard text={this.state.rgbColorString || ''}>
									<button title={`Click To Copy RGB - ${this.state.rgbColorString}`}>
										<Clipboard />
									</button>
								</CopyToClipboard>
								<CopyToClipboard text={`rgb(${this.state.rgbColorString})` || ''}>
									<button title={`Click To Copy RGB CSS - rgb(${this.state.rgbColorString})`}>
										rgb()
										<Clipboard />
									</button>
								</CopyToClipboard>
							</dd>
							<dt>
								<span>HSL:</span>
								<span>{this.state.hslColorString}</span>
							</dt>
							<dd>
								<CopyToClipboard text={this.state.hslColorString || ''}>
									<button title="Click To Copy HSL">
										<Clipboard />
									</button>
								</CopyToClipboard>
								<CopyToClipboard text={`hsl(${this.state.hslColorString})` || ''}>
									<button title={`Click To Copy HSL CSS - hsl(${this.state.hslColorString})`}>
										hsl()
										<Clipboard />
									</button>
								</CopyToClipboard>
							</dd>
						</dl>
					</div>
				</div>
			</div>
		);
	}
}

export default Swatch;
