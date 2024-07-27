// components/TodoForm.js
import React, { useState, useEffect } from 'react';
import '../styles/TodoForm.css';

const TodoForm = ({ addTodo, editTodo, todoToEdit, closeModal }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');

    useEffect(() => {
        if (todoToEdit) {
            setTitle(todoToEdit.title);
            setDescription(todoToEdit.description);
            setTag(todoToEdit.tag);
        } else {
            setTitle('');
            setDescription('');
            setTag('');
        }
    }, [todoToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert("Название и описание обязательны к заполнению");
            return;
        }

        const newTodo = {
            id: todoToEdit ? todoToEdit.id : Date.now(),
            title,
            description,
            tag,
            completed: false,
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
                type="text"
                placeholder="Тег"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />
            <button type="submit">{todoToEdit ? 'Сохранить' : 'Добавить'}</button>
        </form>
    );
};

export default TodoForm;
