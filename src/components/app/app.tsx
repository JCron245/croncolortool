import React from "react";
import "./app.scss";
import ExtendedSwatch from "../extended-swatch/extended-swatch";
import { ToastContainer, toast } from "react-toastify";

const App: React.FC = () => {
	return (
		<div className="app">
			<header className="app-header">
				<p>Cron Color Tool</p>
			</header>
			<ExtendedSwatch />
			<ToastContainer
				hideProgressBar={true}
				enableMultiContainer
				containerId='toasts-container'
				position={toast.POSITION.BOTTOM_RIGHT}
			/>
		</div>
	);
};

export default App;
