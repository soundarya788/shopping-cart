import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our website.</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Learn more about our company, team, or project.</p>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Submit your inquiries or feedback through the contact form below.</p>
      <form>
        <label>Name:</label>
        <input type="text" />
        <br />
        <label>Email:</label>
        <input type="email" />
        <br />
        <label>Message:</label>
        <textarea rows="4" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function App() {
  useEffect(() => {
    console.log('Component mounted!');
  }, []);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const [cartItems, setCartItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem !== '') {
      const item = {
        id: Date.now(),
        name: newItem,
        price: Math.floor(Math.random() * 100) + 1, 
      };
      setCartItems([...cartItems, item]);
      setNewItem('');
    }
  };

  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const [shoppingData, setShoppingData] = useState([]);
  const API_URL = 'https://fakestoreapi.com/products';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setShoppingData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="navigation">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
             <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          <div className="side-panel">
            <h1>To-Do List</h1>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a task..."
            />
            <button onClick={addTask}>Add Task</button>

            <ul>
              {tasks.map((task, index) => (
                <li key={index} className={task.completed ? 'completed' : ''}>
                  {task.text}
                  <button onClick={() => completeTask(index)}>Complete</button>
                  <button onClick={() => removeTask(index)}>Remove</button>
                </li>
              ))}
            </ul>

            <p className="total-tasks">
              Total Tasks: <span>{tasks.length}</span>
            </p>
          </div>

          <div className="side-panel">
            <h1>Shopping Cart</h1>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add an item..."
            />
            <button onClick={addItem}>Add Item</button>

            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} - ${item.price}
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </li>
              ))}
            </ul>

            <p>
              Total Items: {cartItems.length}
              <br />
              Subtotal: ${calculateSubtotal()}
            </p>
          </div>
        </div>

        <h1>Shopping API Data</h1>
        {shoppingData.length === 0 ? (
          <p>Loading shopping data...</p>
        ) : (
          <ul>
            {shoppingData.map((item) => (
              <li key={item.id}>
                {item.title} - {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Router>
  );
}

export default App;











