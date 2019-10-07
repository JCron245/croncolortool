import React from "react";
import "./about.scss";
import { connect } from "react-redux";
import { mapStateToProps } from "../state/index";

const About: React.FC = () => {
	return <div className="about"></div>;
};

export default connect(mapStateToProps)(About);
