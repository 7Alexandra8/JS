import React, { useState } from 'react';
import TodoItem from './TodoItem';
import '../styles/TodoList.css';

const TodoList = ({ todos, openModal, deleteTodo, toggleComplete }) => {
    const [sortOrder, setSortOrder] = useState('asc');

    const sortedTodos = [...todos].sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return (
        <div>
            <div className="sort-buttons">
                <button onClick={() => setSortOrder('asc')}>По возрастанию</button>
                <button onClick={() => setSortOrder('desc')}>По убыванию</button>
                <button onClick={() => setSortOrder('asc')}>Сбросить сортировку</button>
            </div>
            <ul className="todo-list">
                {sortedTodos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        openModal={() => openModal(todo)}
                        deleteTodo={deleteTodo}
                        toggleComplete={toggleComplete}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
