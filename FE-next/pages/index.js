import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoRequest } from '../src/redux/todosSlice';
import TodoList from '../src/components/TodoList';
import styles from './todo.module.css';

export default function Home() {
    const dispatch = useDispatch();
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            dispatch(addTodoRequest({ text: newTodo }));
            setNewTodo('');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>To-Do List</h1>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter a new task"
                    className={styles.input}
                />
                <button onClick={handleAddTodo} className={styles.addButton}>
                    ADD TO-DO
                </button>
            </div>
            <TodoList />
        </div>
    );
}
