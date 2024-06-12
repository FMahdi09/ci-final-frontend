import axios from "axios";

const API_URL = 'http://cibackend.zapto.org';

const readTodos = async (token) => {
    let res = await axios.get(`${API_URL}/todos`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res.data;
}

const createTodo = async (name, token) => {
    let res = await axios.post(
        `${API_URL}/todos`,
        { 'name': name },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    return res.data;
}

const doneTodo = async (id, token) => {
    let res = await axios.put(
        `${API_URL}/todos/${id}/done`,
        {},
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    return res.data;
}

const undoneTodo = async (id, token) => {
    let res = await axios.delete(
        `${API_URL}/todos/${id}/done`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    return res.data;
}

const registerUser = async (username, password) => {
    let res = await axios.post(`${API_URL}/auth/register`, { username, password });
    return res.data;
}

const loginUser = async (username, password) => {
    let res = await axios.post(`${API_URL}/auth/login`, { username, password });
    return res.data;
}

export {
    readTodos,
    createTodo,
    doneTodo,
    undoneTodo,
    registerUser,
    loginUser
}