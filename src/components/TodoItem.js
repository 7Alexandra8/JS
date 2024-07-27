import React from 'react';
import '../styles/TodoItem.css';

const TodoItem = ({ todo, toggleComplete, deleteTodo, openModal }) => {
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div
                className={`status-mark ${todo.completed ? 'completed' : 'incomplete'}`}
                onClick={() => toggleComplete(todo.id)}
            ></div>
            <div className="todo-title" onClick={() => openModal(todo)}>
                {todo.title}
            </div>
            <div className="todo-date">{new Date(todo.dueDate).toLocaleDateString()}</div>
            <div className="todo-actions">
                <button className="edit-btn" onClick={() => openModal(todo)}>✎</button>
                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>✕</button>
            </div>
        </li>
    );
};

export default TodoItem;
