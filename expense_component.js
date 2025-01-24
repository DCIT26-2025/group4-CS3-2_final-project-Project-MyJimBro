import React, { useState } from "react";
import { Button, ScrollView, Text, View, Alert } from "react-native";
import styles from "./styles";

export default function ExpenseComponent({
  expenses,
  setExpenses,
  chartData,
  setChartData,
  editExpense,
}) {
  return (
    <ScrollView style={{ marginBottom: 80 }}>
      {expenses.map((expense) => (
        <ExpenseListTile
          key={expense.id}
          expense={expense}
          expenses={expenses}
          setExpenses={setExpenses}
          chartData={chartData}
          setChartData={setChartData}
          editExpense={editExpense}
        />
      ))}
    </ScrollView>
  );
}

const ExpenseListTile = ({
  expense,
  expenses,
  setExpenses,
  chartData,
  setChartData,
  editExpense,
}) => {
  return (
    <View style={styles.expenseTile}>
      <Text style={styles.expenseTileText}>{expense.name}</Text>
      <Text style={styles.expenseTileText}>{expense.category}</Text>
      <Text style={styles.expenseTileText}>₱{expense.amount}</Text>
      <View style={styles.row}>
        <Button
          onPress={() => editExpense(expense)} // Call the edit function
          color="blue"
          title="Edit"
        />
        <View style={{ marginLeft: 5 }}>
          <Button
            onPress={() => {
              Alert.alert("Delete", "Are you sure you want to delete?", [
                {
                  text: "Yes",
                  onPress: () => {
                    const updatedExpenses = expenses.filter(
                      (item) => item.id !== expense.id
                    );
                    setExpenses(updatedExpenses);

                    const updatedChartData = [...chartData];
                    const categoryIndex = updatedChartData.findIndex(
                      (item) => item.name === expense.category
                    );
                    updatedChartData[categoryIndex].amount -= expense.amount;
                    setChartData(updatedChartData);
                  },
                },
                { text: "No" },
              ]);
            }}
            color="black"
            title="Delete"
          />
        </View>
      </View>
    </View>
  );
};
