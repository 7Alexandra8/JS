import React from 'react';
import '../styles/TodoItem.css';

function TodoItem({ todo, editTodo, deleteTodo, toggleComplete, openModal }) {
    return (
        <li className={`todo-item ${todo.completed ? 'checked' : ''}`}>
            <div className="status-mark" onClick={() => toggleComplete(todo.id)}></div>
            <div className="todo-title" onClick={() => toggleComplete(todo.id)}>
                {todo.title}
            </div>
            <div className="todo-actions">
                <button className="edit-btn" onClick={() => openModal(todo)}>✎</button>
                <button className="close-btn" onClick={() => deleteTodo(todo.id)}>✕</button>
            </div>
        </li>
    );
}

export default TodoItem;
