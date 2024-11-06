// src/redux/sagas/todosSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    fetchTodosRequest, fetchTodosSuccess, fetchTodosFailure,
    addTodoRequest, addTodoSuccess, addTodoFailure,
    deleteTodoRequest, deleteTodoSuccess, deleteTodoFailure,
} from '../todosSlice';

const BASE_URL = 'http://localhost:3000/todos';

function* fetchTodos() {
    try {
        const response = yield call(axios.get, BASE_URL);
        yield put(fetchTodosSuccess(response.data));
    } catch (error) {
        yield put(fetchTodosFailure(error.message));
    }
}

function* addTodo(action) {
    try {
        const response = yield call(axios.post, BASE_URL, {
            todoContent: action.payload.text,
            userId: "66a9086ac8a4eef3b4a53ff8",     // Example userId
            projectId: "66a90aecc8a4ee8d46a53ffc"  // Example projectId
        });
        yield put(addTodoSuccess(response.data));
    } catch (error) {
        yield put(addTodoFailure(error.message));
    }
}

function* deleteTodo(action) {
    try {
        yield call(axios.delete, `${BASE_URL}/${action.payload}`);
        yield put(deleteTodoSuccess(action.payload));
    } catch (error) {
        yield put(deleteTodoFailure(error.message));
    }
}

export default function* todosSaga() {
    yield takeEvery(fetchTodosRequest.type, fetchTodos);
    yield takeEvery(addTodoRequest.type, addTodo);
    yield takeEvery(deleteTodoRequest.type, deleteTodo);
}
