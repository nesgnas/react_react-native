import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import styles from './styles';

export default function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const USER_ID = "66a9086ac8a4eef3b4a53ff8";
  const PROJECT_ID = "66a90aecc8a4ee8d46a53ffc";
  const BASE_URL = 'http://10.0.2.2:3000/todos';
  const HTTP_METHODS = { GET: 'GET', POST: 'POST', DELETE: 'DELETE' };
  const STATUS_CODES = { CREATED: 201, NO_CONTENT: 204 };

  const fetchTodos = async () => {
    try {
      const response = await fetch(BASE_URL, { method: HTTP_METHODS.GET });
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch todos');
      console.error(error);
    }
  };

  const addTodo = async () => {
    if (todo.trim()) {
      try {
        const response = await fetch(BASE_URL, {
          method: HTTP_METHODS.POST,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            todoContent: todo,
            userId: USER_ID,
            projectId: PROJECT_ID,
          }),
        });

        if (response.status === STATUS_CODES.CREATED) {
          const newTodo = await response.json();
          setTodos([...todos, newTodo]);
          setTodo('');
        } else {
          const errorText = await response.text();
          Alert.alert('Error', `Unable to add todo: ${errorText}`);
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
        console.error('Error details:', error);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { method: HTTP_METHODS.DELETE });
      if (response.status === STATUS_CODES.NO_CONTENT) {
        setTodos(todos.filter((item) => item.id !== id));
      } else {
        const errorText = await response.text();
        Alert.alert('Error', `Unable to delete todo: ${errorText}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error('Error details:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
      <View style={styles.container}>
        <Text style={styles.title}>To-Do List</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter a new task"
            value={todo}
            onChangeText={setTodo}
        />
        <Button title="Add To-Do" onPress={addTodo} />
        <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.todoItem}>
                  <Text style={styles.todoText}>{item.todoContent}</Text>
                  <Button title="Delete" color="red" onPress={() => deleteTodo(item.id)} />
                </View>
            )}
        />
      </View>
  );
}
