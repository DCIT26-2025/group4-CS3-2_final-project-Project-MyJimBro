import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, SafeAreaView, Text, View, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import styles from "../../styles";
import Addform from "../../add_expense";
import ExpenseComponent from "../../expense_component";

export default function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Pagkain");
  const [expenses, setExpenses] = useState<{ name: string; amount: number; category: string }[]>([]);
  const categories = ["Pagkain", "Pamasahe", "Bills", "Others"];
  const [addForm, setAddForm] = useState(false);

  const addExpense = () => {
    setAddForm(true);
  };

  const [chartData, setChartData] = useState([
    {
      name: "Pagkain",
      amount: 0,
      color: "#e62d20",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Pamasahe",
      amount: 0,
      color: "#27e620",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Bills",
      amount: 0,
      color: "#1c6bd9",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Others",
      amount: 0,
      color: "#5adbac",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ]);

  // Function to calculate total expenses
  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="auto" />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.heading}>MyJimBros</Text>
        <Text style={styles.heading2}>Expense Tracker</Text>

        {/* Display Total Expenses */}
        <Text style={styles.totalExpenses}>Total Expenses: ₱{calculateTotalExpenses()}</Text>

        {/* Render the PieChart component with data */}
        <PieChart
          data={chartData}
          width={300}
          height={200}
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientTo: "#08130D",
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={{ marginLeft: 20, marginRight: 20 }}
        />

        {/* Conditional rendering: If addForm is true, render the Addform component */}
        {addForm === true ? (
          <Addform
            name={name}
            setName={setName}
            amount={amount}
            setAmount={setAmount}
            category={category}
            setCategory={setCategory}
            categories={categories}
            setExpenses={setExpenses}
            expenses={expenses}
            chartData={chartData}
            setChartData={setChartData}
            setAddForm={setAddForm}
          />
        ) : (
          <View style={styles.row}>
            <View style={styles.addButton}>
              <Button
                onPress={addExpense}
                color="green"
                title="Add Expense"
              />
            </View>
          </View>
        )}

        {/* Render the ExpenseComponent */}
        <ExpenseComponent
          expenses={expenses}
          setExpenses={setExpenses}
          chartData={chartData}
          setChartData={setChartData}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
