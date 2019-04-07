import React, { Component, ReactElement } from 'react';
import Swatch from './Swatch';
import logo from '../images/logo.svg';
import chroma from 'chroma-js';
import '../scss/App.scss';

interface AppState {
	multiHexData: string[];
	singleHexData: string;
	count: number;
	multi: boolean;
	single: boolean;
	isMobile: boolean;
	maxSwatch: number;
}

class App extends Component<{}, AppState> {
	state: AppState = {
		multiHexData: [chroma.random().hex(), chroma.random().hex(), chroma.random().hex()],
		singleHexData: '#0FADED',
		count: 3,
		multi: true,
		single: false,
		isMobile: window.innerWidth < 480,
		maxSwatch: window.innerWidth < 480 ? 4 : 12
	};

	enableMulti = () => {
		this.setState({ multi: true, single: false });
	};

	enableSingle = () => {
		this.setState({ multi: false, single: true });
	};

	createSwatch = (color: string, index: number) => {
		return <Swatch color={color} key={color} index={index} remove={this.removeSwatch} randomize={this.randomizeSwatch} />;
	};

	createSwatches = (colors: string[]): any => {
		return colors.map(this.createSwatch);
	};

	addSwatch = () => {
		if (this.state.multiHexData.length < this.state.maxSwatch) {
			let arr = [...this.state.multiHexData];
			arr.push(chroma.random().hex());
			this.setState({
				multiHexData: arr,
				count: arr.length
			});
			this.createSwatches(arr);
		}
	};

	onWindowResize = () => {
		this.setState({ isMobile: window.innerWidth < 480 });
	};

	componentDidMount(): void {
		window.addEventListener('resize', this.onWindowResize);
	}

	componentWillUnmount(): void {
		window.removeEventListener('resize', this.onWindowResize);
	}

	removeSwatch = (index: number) => {
		if (this.state.multiHexData.length > 1) {
			let colors = this.state.multiHexData;
			colors.splice(index, 1);
			this.setState({ multiHexData: colors });
		}
	};

	randomizeSwatch = (index: number) => {
		if (this.state.multi) {
			let colors = this.state.multiHexData;
			colors[index] = String(chroma.random());
			this.setState({ multiHexData: colors });
		} else {
			this.setState({ singleHexData: String(chroma.random()) });
		}
	};

	render(): ReactElement {
		return (
			<div className="app">
				<nav className="navbar">
					<img src={logo} className="app-logo" alt="logo" />
					<p>Cron Color Tool</p>
					{this.state.multi && (
						<button onClick={this.addSwatch} disabled={this.state.multiHexData.length === this.state.maxSwatch ? true : false}>
							Add Swatch
						</button>
					)}
				</nav>
				<ul className="nav nav-pills nav-justified">
					<li className="nav-item">
						<a className={'nav-link ' + (this.state.single && 'active')} href="#" onClick={this.enableSingle}>
							Single Color Mode
						</a>
					</li>
					<li className="nav-item">
						<a className={'nav-link ' + (this.state.multi && 'active')} href="#" onClick={this.enableMulti}>
							Color Swatch
						</a>
					</li>
				</ul>
				<main>
					{this.state.multi && <div className="row">{this.createSwatches(this.state.multiHexData)}</div>}
					{this.state.single && <Swatch color={this.state.singleHexData} key={'#0faded'} index={1} randomize={this.randomizeSwatch} />}
				</main>
			</div>
		);
	}
}

export default App;
