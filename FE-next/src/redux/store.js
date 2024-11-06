// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todosReducer from './todosSlice';
import todosSaga from './sagas/todosSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        todos: todosReducer,
    },
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(todosSaga);

export default store;
