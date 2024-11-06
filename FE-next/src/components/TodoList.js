// src/components/TodoList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodosRequest, deleteTodoRequest } from '../redux/todosSlice';
import TodoItem from './TodoItem';

const TodoList = () => {
    const dispatch = useDispatch();
    const { list, loading } = useSelector((state) => state.todos);

    useEffect(() => {
        dispatch(fetchTodosRequest());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteTodoRequest(id));
    };

    return (
        <div>
            <h2>Todo List</h2>
            {loading && <p>Loading...</p>}
            {list.map(todo => (
                <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default TodoList;
