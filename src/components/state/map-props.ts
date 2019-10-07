export const mapStateToProps = (state: any) => {
	return {
		currentColor: {
			hexString: state.currentColor.hexString,
			rgbString: state.currentColor.rgbString,
			nameString: state.currentColor.nameString
		}
	};
};
