import React from "react";
import "./app.scss";
import { connect } from "react-redux";
import { mapStateToProps } from "../state/index";
import ExtendedSwatch from "../extended-swatch/extended-swatch";

const App: React.FC = () => {
	return (
		<div className="app">
			<header className="app-header">
				<p>Cron Color Tool</p>
			</header>
			<ExtendedSwatch />
		</div>
	);
};

export default connect(mapStateToProps)(App);
