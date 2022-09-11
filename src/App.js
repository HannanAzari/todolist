import { useState, useEffect } from 'react';
import './App.css';
import Form from './component/form';
import ToDoList from './component/toDoList';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [errorText, setErrorText] = useState('');
  

  useEffect(()=>{
    getLocalTodos();
  },[]);

  
  useEffect(()=>{
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  

  const filterHandler = () => {
    switch (status) {
      case 'completed':
      setFilteredTodos(todos.filter((todos) => todos.completed === true));
      break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((todos) => todos.completed === false));
        break;
        default:
        setFilteredTodos(todos);
        break;

    }
  };

  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };


  return (
    <div className="App">
      
        <header>
            <h1>To Do List</h1>
        </header>
        <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} setStatus={setStatus} setErrorText={setErrorText}/>
        <p className='error'>{errorText}</p>
        <ToDoList filteredTodos={filteredTodos} todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
