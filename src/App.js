import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Modal from './components/Modal';
import './styles/App.css';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState(null);
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState({ field: 'date', direction: 'asc' });
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleSortChange = (field) => {
        // If field is '...', set sorting to null or ignore sorting
        if (field === '...') {
            setSort(null);
        } else {
            setSort((prevSort) => ({
                field,
                direction: prevSort && prevSort.field === field && prevSort.direction === 'asc' ? 'desc' : 'asc',
            }));
        }
    };

    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery)
    ).filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'incomplete') return !todo.completed;
        return true;
    });

    const sortedTodos = (sort ? filteredTodos.sort((a, b) => {
        let comparison = 0;
        if (sort.field === 'date') {
            comparison = new Date(a.dueDate) - new Date(b.dueDate);
        } else if (sort.field === 'title') {
            comparison = a.title.localeCompare(b.title);
        }
        return sort.direction === 'asc' ? comparison : -comparison;
    }) : filteredTodos);

    return (
        <div className="container">
            <header className="header">
                <h1>Список задач</h1>
                <div className="controls">
                    <input
                        type="text"
                        placeholder="Поиск задач"
                        onChange={handleSearch}
                    />
                    <select onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">Все</option>
                        <option value="completed">Завершенные</option>
                        <option value="incomplete">Незавершенные</option>
                    </select>
                    <select onChange={(e) => handleSortChange(e.target.value)}>
                        <option value="date">По дате</option>

                    </select>
                </div>
            </header>
            <TodoList
                todos={sortedTodos}
                openModal={openModal}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
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
