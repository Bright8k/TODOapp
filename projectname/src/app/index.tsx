import React, { useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, View, Button } from "react-native";
import { CheckBox } from "@rneui/themed";

// Define the type for a task
type Task = {
  id: string;
  description: string;
  completed: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", description: "Sample Task 1", completed: false },
    { id: "2", description: "Sample Task 2", completed: true },
  ]);
  const [newTask, setNewTask] = useState<string>("");

  // Function to toggle task completion
  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now().toString(), description: newTask, completed: false }]);
      setNewTask("");
    }
  };

  // Function to render tasks
  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <CheckBox checked={item.completed} onPress={() => toggleTask(item.id)} />
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TODO List</Text>

      {/* Task Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      {/* Task List */}
      <FlatList data={tasks} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  taskText: {
    fontSize: 18,
  },
  completedTask: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "gray",
  },
});
