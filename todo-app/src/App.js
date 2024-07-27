import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Modal from './components/Modal';
import './styles/App.css';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState(null);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
            setTodos(savedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };

    const editTodo = (updatedTodo) => {
        setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const openModal = (todo) => {
        setTodoToEdit(todo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTodoToEdit(null);
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Список задач</h1>
                <div className="menu">&#9776;</div>
                <div className="settings">&#9881;</div>
            </header>
            <TodoList
                todos={todos}
                openModal={openModal}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
                editTodo={editTodo}
            />
            <button className="add-task-btn" onClick={() => openModal(null)}>Добавить задачу</button>
            {isModalOpen && (
                <Modal closeModal={closeModal}>
                    <TodoForm
                        addTodo={addTodo}
                        editTodo={editTodo}
                        todoToEdit={todoToEdit}
                        closeModal={closeModal}
                    />
                </Modal>
            )}
        </div>
    );
};

export default App;
