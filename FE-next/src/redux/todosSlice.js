// src/redux/todosSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchTodosRequest: (state) => { state.loading = true; },
        fetchTodosSuccess: (state, action) => {
            state.list = action.payload;
            state.loading = false;
        },
        fetchTodosFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        addTodoRequest: (state) => { state.loading = true; },
        addTodoSuccess: (state, action) => {
            state.list.push(action.payload);
            state.loading = false;
        },
        addTodoFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteTodoRequest: (state) => { state.loading = true; },
        deleteTodoSuccess: (state, action) => {
            state.list = state.list.filter(todo => todo.id !== action.payload);
            state.loading = false;
        },
        deleteTodoFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    fetchTodosRequest,
    fetchTodosSuccess,
    fetchTodosFailure,
    addTodoRequest,
    addTodoSuccess,
    addTodoFailure,
    deleteTodoRequest,
    deleteTodoSuccess,
    deleteTodoFailure,
} = todosSlice.actions;

export default todosSlice.reducer;
