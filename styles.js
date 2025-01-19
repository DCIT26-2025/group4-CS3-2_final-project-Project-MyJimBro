// styles.js

import { StyleSheet } from "react-native";
// styles sheet to store all the styles in one place
const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		
	},
	container: {
		backgroundColor: "#fff",
		height: "100%",
		marginTop: 50,
	},
	heading: {
		marginTop: 20,
		color: "blue",
		fontSize: 30,
		textAlign: "center",
		fontWeight: "bold",
	},
	addButton: {
		padding: 10,
		margin: 10,
		
	},
	heading2: {
		color: "black",
		fontSize: 25,
		textAlign: "center",
		fontWeight: "bold",
	},
	heading3: {
		color: "black",
		fontSize: 20,
		textAlign: "center",
	},
	label: {
		color: "black",
		fontSize: 14,
		textAlign: "left",
		fontWeight: "bold",
		marginLeft: 10,
	},
	expenseTile: {
		// column with 3 cells
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "lightgrey",
		width: "95%",
		padding: 10,
		margin: 10,
		borderRadius: 20, // added rounded edge
	},
	expenseTileText: {
		marginTop: 5,
		fontSize: 16,
		height: 26,
		width: "25%",
		textAlign: "center",
		marginBottom: 5,
	},
	formAdd: {
		// display: "none",
		
	},
	textInput: {
		borderRadius: 12,
		borderColor: "black",
		borderWidth: 1,
		padding: 10,
		margin: 10,
	},
	totalExpenses: {
		fontSize: 18,
		fontWeight: "bold",
		color: "green",  // You can change the color to suit your design
		textAlign: "center",
		marginVertical: 20,
	  },
	  
});
export default styles;
