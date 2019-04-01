import React, { Component, ReactElement } from 'react';
import Swatch from './Swatch';
import logo from '../logo.svg';
import chroma from 'chroma-js';
import '../scss/App.scss';

interface AppState {
	hexData: string[];
	count: number;
}

class App extends Component<{}, AppState> {
	state: AppState = {
		hexData: [
			chroma.random().hex(),
			chroma.random().hex(),
			chroma.random().hex(),
			chroma.random().hex()
		],
		count: 4
	};

	createSwatch = (color: string) => {
		console.log(color);
		return <Swatch color={color} count={this.state.count} key={color} />;
	};

	createSwatches = (colors: string[]) => {
		return colors.map(this.createSwatch);
	};

	addSwatch = () => {
		if (this.state.hexData.length < 7) {
			let arr = [...this.state.hexData];
			arr.push(chroma.random().hex());
			this.setState({
				hexData: arr,
				count: arr.length
			});
			this.createSwatches(arr);
		}
	};

	render(): ReactElement {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>Cron Color Tool</p>
					<button
						onClick={this.addSwatch}
						disabled={this.state.hexData.length === 7 ? true : false}>
						Add Swatch
					</button>
				</header>
				<main>{this.createSwatches(this.state.hexData)}</main>
			</div>
		);
	}
}

export default App;
