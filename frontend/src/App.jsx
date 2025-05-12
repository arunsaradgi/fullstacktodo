import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      toast.error('Failed to fetch todos');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editingId) {
        await axios.patch(`${API_URL}/todos/${editingId}`, {
          title,
          description
        });
        toast.success('Todo updated successfully');
      } else {
        await axios.post(`${API_URL}/todos`, {
          title,
          description
        });
        toast.success('Todo added successfully');
      }
      setTitle('');
      setDescription('');
      setEditingId(null);
      fetchTodos();
    } catch (error) {
      toast.error('Failed to save todo');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      toast.success('Todo deleted successfully');
      fetchTodos();
    } catch (error) {
      toast.error('Failed to delete todo');
    }
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingId(todo._id);
  };

  const handleToggleComplete = async (todo) => {
    try {
      await axios.patch(`${API_URL}/todos/${todo._id}`, {
        completed: !todo.completed
      });
      fetchTodos();
    } catch (error) {
      toast.error('Failed to update todo');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter todo title"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description (optional)"
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {editingId ? 'Update Todo' : 'Add Todo'}
          </button>
        </form>

        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className={`bg-white p-4 rounded-lg shadow-md flex items-center justify-between ${
                todo.completed ? 'bg-green-50' : ''
              }`}
            >
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className="text-gray-600 mt-1">{todo.description}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleComplete(todo)}
                  className="p-2 text-green-500 hover:bg-green-100 rounded"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleEdit(todo)}
                  className="p-2 text-blue-500 hover:bg-blue-100 rounded"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App; 