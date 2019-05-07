import React, { Component, ReactElement } from 'react';
import Swatch from './Swatch';
import logo from '../assets/images/logo.svg';
import chroma from 'chroma-js';
import '../scss/App.scss';
import { SwatchExtended } from './SwatchExtended';
import ReactGA from 'react-ga';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { PlusCircle } from 'react-feather';

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
		singleHexData: chroma.random().hex(),
		count: 3,
		multi: false,
		single: true,
		isMobile: window.innerWidth < 480,
		maxSwatch: window.innerWidth < 992 ? (window.innerWidth < 480 ? 4 : 6) : 12
	};

	enableMulti = () => {
		ReactGA.pageview(window.location.pathname + window.location.search + '-multi');
		this.setState({ multi: true, single: false });
	};

	enableSingle = () => {
		ReactGA.pageview(window.location.pathname + window.location.search + '-single');
		this.setState({ multi: false, single: true });
	};

	createSwatch = (color: string, index: number) => {
		return <Swatch color={color} key={color} index={index} remove={this.removeSwatch} randomize={this.randomizeSwatch} />;
	};

	createSwatches = (colors: string[]): any => {
		ReactGA.event({
			category: 'Swatch',
			action: 'Add'
		});
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
			ReactGA.event({
				category: 'Swatch',
				action: 'Remove'
			});
		} else {
			ReactGA.event({
				category: 'Swatch',
				action: 'Remove - LAST'
			});
		}
	};

	randomizeSwatch = (index: number) => {
		if (this.state.multi) {
			let colors = this.state.multiHexData;
			colors[index] = String(chroma.random());
			this.setState({ multiHexData: colors });
			ReactGA.event({
				category: 'Color Change - Multi',
				action: 'Randomize'
			});
		} else {
			this.setState({ singleHexData: String(chroma.random()) });
		}
	};

	render(): ReactElement {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		return (
			<div className="app">
				<Navbar expand="lg">
					<Navbar.Brand href="#single">
						<img src={logo} className="app-logo" alt="logo" style={{ maxHeight: '35px' }} />
						<span>Cron Color Tool<sup>alpha</sup></span>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto" variant="pills" defaultActiveKey="#single">
							<Nav.Link href="#single" onClick={this.enableSingle}>
								Single Color
							</Nav.Link>
							<Nav.Link href="#multi" onClick={this.enableMulti}>
								Color Swatch
							</Nav.Link>
							{this.state.multi && window.innerWidth >= 992 && (
								<Button className="page-action" onClick={this.addSwatch} variant="success" disabled={this.state.multiHexData.length === this.state.maxSwatch}>
									Add Swatch
								</Button>
							)}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				
				{this.state.multi && window.innerWidth <= 992 && 
					(<Button variant="success" className="addSwatch" onClick={this.addSwatch} style={{ display: this.state.multiHexData.length === this.state.maxSwatch ? 'none': 'inline-block'}}>
						<PlusCircle />
					</Button>)
				}

				<main>
					{this.state.multi && <div className="row">{this.createSwatches(this.state.multiHexData)}</div>}
					{this.state.single && <SwatchExtended color={this.state.singleHexData} />}
				</main>
			</div>
		);
	}
}

export default App;
