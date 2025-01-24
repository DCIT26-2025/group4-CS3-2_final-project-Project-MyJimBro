import { StyleSheet } from "react-native";

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
    color: "#ADD8E6",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  addButton: {
    padding: 10,
    margin: 10,
  },
  heading2: {
    color: "#ADD8E6",
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
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightgrey",
    width: "95%",
    padding: 10,
    margin: 15,
    borderRadius: 15,
  },
  expenseTileText: {
    marginTop: 5,
    fontSize: 15,
    height: 25,
    width: "auto", // Allow width to adjust automatically
    textAlign: "left",
    marginBottom: 5,
    flexShrink: 1, // Allow text to shrink if necessary
    flexGrow: 1, // Allow text to grow if necessary
    flexBasis: "auto", // Allow text to take up available space
    overflow: "hidden", // Hide overflow text
    textOverflow: "ellipsis", // Add ellipsis for overflow text
    whiteSpace: "nowrap", // Prevent text from wrapping to the next line
},
  textInput: {
    borderRadius: 12,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    color: "white", // Text color for dark backgrounds
    backgroundColor: "#222", // Input background for dark mode
  },
  totalExpenses: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginVertical: 20,
  },
  
});

export default styles;
