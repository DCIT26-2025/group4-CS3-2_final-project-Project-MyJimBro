import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, SafeAreaView, Text, View, ScrollView, TextInput, Image } from "react-native";
import { PieChart } from "react-native-chart-kit";
import styles from "../../styles";
import Addform from "../../add_expense";
import ExpenseComponent from "../../expense_component";
import logo from "../../assets/images/logo.png";

export default function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState<{ name: string; amount: number; category: string; id: number }[]>([]);
  const categories = ["Food", "Travel", "Bills", "Others"];
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState<number | null>(null);

  const [chartData, setChartData] = useState([
    {
      name: "Food",
      amount: 0,
      color: "yellow",
      legendFontColor: "white",
      legendFontSize: 15,
    },
    {
      name: "Travel",
      amount: 0,
      color: "#ff7f50",
      legendFontColor: "white",
      legendFontSize: 15,
    },
    {
      name: "Bills",
      amount: 0,
      color: "red",
      legendFontColor: "white",
      legendFontSize: 15,
    },
    {
      name: "Others",
      amount: 0,
      color: "#5adbac",
      legendFontColor: "white",
      legendFontSize: 15,
    },
  ]);

  const [monthlyLimit, setMonthlyLimit] = useState(0);
  const [exceeded, setExceeded] = useState(false);

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const calculateMonthlyExpenses = () => {
    const currentMonth = new Date().getMonth();
    return expenses.reduce((total, expense) => {
      const expenseDate = new Date(expense.id);
      if (expenseDate.getMonth() === currentMonth) {
        return total + expense.amount;
      }
      return total;
    }, 0);
  };

  useEffect(() => {
    const monthlyExpenses = calculateMonthlyExpenses();

    if (monthlyLimit > 0 && monthlyExpenses > monthlyLimit) {
      setExceeded(true);
    } else {
      setExceeded(false);
    }
  }, [expenses, monthlyLimit]);

  const addExpense = () => {
    setAddForm(true);
  };

  const editExpense = (expense: { name: string; amount: number; category: string; id: number }) => {
    setName(expense.name);
    setAmount(expense.amount.toString());
    setCategory(expense.category);
    setEditExpenseId(expense.id);
    setEditForm(true);
  };

  const saveEditedExpense = () => {
    if (editExpenseId !== null) {
      const updatedExpenses = expenses.map((expense) =>
        expense.id === editExpenseId
          ? { ...expense, name, amount: parseInt(amount), category }
          : expense
      );
      setExpenses(updatedExpenses);

      const updatedChartData = [...chartData];
      const categoryIndex = updatedChartData.findIndex((item) => item.name === category);
      updatedChartData[categoryIndex].amount = updatedExpenses.reduce(
        (total, expense) => (expense.category === category ? total + expense.amount : total),
        0
      );
      setChartData(updatedChartData);

      setEditForm(false);
      setName("");
      setAmount("");
      setCategory("Food");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#333333" }}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Add the logo here */}

        <Text style={styles.heading}>MyJimBro's</Text>
        <Image source={logo} style={{ width: 80, height: 80, alignSelf: "center", marginBottom: 20 }} />
        <Text style={styles.heading2}>Expense Tracker</Text>

        <Text style={styles.totalExpenses}>Total Expenses: ₱{calculateTotalExpenses()}</Text>

        <View style={{ padding: 10 }}>
          <Text style={styles.label}>Set Monthly Limit (₱)</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.textInput}
            placeholder="Enter monthly limit"
            value={monthlyLimit.toString()}
            onChangeText={(value) => setMonthlyLimit(Number(value))}
          />
        </View>

        {exceeded && (
          <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>
            Warning: You have exceeded your expense limit!
          </Text>
        )}

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

        {addForm ? (
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
              <Button onPress={addExpense} color="green" title="Add Expense" />
            </View>
          </View>
        )}

        {editForm && (
          <View style={{ padding: 10 }}>
            <Text style={styles.label}>Expense Name</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
            <Text style={styles.label}>Category</Text>
            <TextInput
              style={styles.textInput}
              value={category}
              onChangeText={(text) => setCategory(text)}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
              <Button title="Save" onPress={saveEditedExpense} color="green" />
              <Button title="Cancel" onPress={() => setEditForm(false)} color="red" />
            </View>
          </View>
        )}

        <ExpenseComponent
          expenses={expenses}
          setExpenses={setExpenses}
          chartData={chartData}
          setChartData={setChartData}
          editExpense={editExpense}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
