// src/components/TodoItem.js
import React from 'react';

const TodoItem = ({ todo, onDelete }) => {
    return (
        <div style={styles.todoContainer}>
            <span style={styles.todoText}>{todo.todoContent.toUpperCase()}</span>
            <button onClick={() => onDelete(todo.id)} style={styles.deleteButton}>
                DELETE
            </button>
        </div>
    );
};

const styles = {
    todoContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        padding: '10px 15px',
        borderRadius: '5px',
        width: '100%',
        maxWidth: '400px',
        marginBottom: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    todoText: {
        fontSize: '16px',
        color: '#333',
    },
    deleteButton: {
        backgroundColor: '#ff4d4f',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
};

export default TodoItem;
