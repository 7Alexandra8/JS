import React from 'react';
import TodoItem from './TodoItem';
import '../styles/TodoList.css';

const TodoList = ({ todos, openModal, deleteTodo, toggleComplete, editTodo }) => {
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    openModal={() => openModal(todo)} // Передача задачи для редактирования
                    deleteTodo={deleteTodo}
                    toggleComplete={toggleComplete}
                    editTodo={editTodo}
                />
            ))}
        </ul>
    );
};

export default TodoList;
