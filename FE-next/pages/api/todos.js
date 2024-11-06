// pages/api/todos.js
import {METHODS, STATUS_CODES} from "../../utils";

let todos = [];


export default function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case METHODS.GET:
            res.status(STATUS_CODES.OK).json(todos);
            break;
        case METHODS.POST:
            const newTodo = { id: Date.now().toString(), ...req.body };
            todos.push(newTodo);
            res.status(STATUS_CODES.CREATED).json(newTodo);
            break;
        case METHODS.DELETE:
            todos = todos.filter(todo => todo.id !== id);
            res.status(STATUS_CODES.NO_CONTENT).end();
            break;
        default:
            res.setHeader("Allow", [METHODS.GET, METHODS.POST, METHODS.DELETE]);
            res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end(`Method ${method} Not Allowed`);
    }
}
