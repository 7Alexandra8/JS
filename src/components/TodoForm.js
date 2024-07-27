import React, { useState, useEffect } from 'react';
import '../styles/TodoForm.css';

const TodoForm = ({ addTodo, editTodo, todoToEdit, closeModal }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (todoToEdit) {
            setTitle(todoToEdit.title);
            setDescription(todoToEdit.description);
            setDueDate(todoToEdit.dueDate);
        } else {
            setTitle('');
            setDescription('');
            setDueDate('');
        }
    }, [todoToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !dueDate) {
            alert("Название и дата завершения обязательны к заполнению");
            return;
        }

        const newTodo = {
            id: todoToEdit ? todoToEdit.id : Date.now(),
            title,
            description,
            dueDate,
            completed: todoToEdit ? todoToEdit.completed : false,
        };

        if (todoToEdit) {
            editTodo(newTodo);
        } else {
            addTodo(newTodo);
        }

        closeModal();
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <h2>{todoToEdit ? 'Редактировать задачу' : 'Новая задача'}</h2>
            <input
                type="text"
                placeholder="Название"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                placeholder="Дата завершения"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button type="submit">{todoToEdit ? 'Сохранить' : 'Добавить'}</button>
        </form>
    );
};

export default TodoForm;
