import { Picker } from "@react-native-picker/picker";
import { Button, Text, TextInput, View } from "react-native";
import styles from "./styles";

export default function Addform({
  name,
  setName,
  amount,
  setAmount,
  category,
  setCategory,
  categories,
  setExpenses,
  expenses,
  chartData,
  setChartData,
  setAddForm,
}) {
  return (
    <View>
      <Text style={styles.heading3}>Add your expenses:</Text>

      {/* Input field for expense name */}
      <Text style={styles.label}>Expense Name</Text>
      <TextInput
        onChangeText={(value) => setName(value)}
        value={name}
        style={{ ...styles.textInput, borderRadius: 100 }}
        placeholder="Enter the expense name"
      />

      {/* Input field for expense amount */}
      <Text style={styles.label}>Amount</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={(value) => {
          value = value.replace(/[^0-9]/g, ""); // Ensure numeric input only
          setAmount(value);
        }}
        value={amount}
        style={{ ...styles.textInput, borderRadius: 100 }}
        placeholder="Enter the amount"
      />

      {/* Dropdown for selecting category */}
      <Text style={styles.label}>Category</Text>
      <View
        style={{
          ...styles.textInput,
          borderRadius: 100,
          backgroundColor: "#333333",
        }}
      >
        <Picker
          style={{ borderRadius: 100, color: "black" }}
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          {categories.map((category, index) => (
            <Picker.Item key={index} label={category} value={category} />
          ))}
        </Picker>
      </View>

      {/* Add and Cancel Buttons */}
      <View style={styles.row}>
        <Button
          onPress={() => {
            let amountNumber = parseInt(amount);

            if (amountNumber <= 0 || name.trim() === "") {
              alert("Please enter a valid amount and name.");
              return;
            }

            // Add the new expense to the list
            setExpenses([
              ...expenses,
              {
                id: new Date().getTime(),
                category,
                name,
                amount: amountNumber,
              },
            ]);

            // Update the chart data
            const newChartData = [...chartData];
            const categoryIndex = newChartData.findIndex(
              (item) => item.name === category
            );
            newChartData[categoryIndex].amount += amountNumber;
            setChartData(newChartData);

            // Reset fields and close form
            setAddForm(false);
            setName("");
            setAmount("");
            setCategory("Food");
          }}
          color="green"
          title="Add Expense"
        />
        <Button
          onPress={() => setAddForm(false)}
          color="red"
          title="Cancel"
        />
      </View>
    </View>
  );
}
