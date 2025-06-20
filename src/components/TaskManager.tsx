import { useState, useEffect } from 'react';
import { Plus, Trash2, Check, X } from 'lucide-react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  // Ładowanie zadań z pamięci przy pierwszym renderze
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  // Zapisywanie zadań do localStorage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Menedżer Zadań
          </h1>
          <p className="text-gray-600">
            Organizuj swoje zadania w prosty sposób
          </p>
        </div>

        {/* Add Task Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Dodaj nowe zadanie..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button
              onClick={addTask}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Dodaj
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Wszystkich zadań: {tasks.length}</span>
            <span>Aktywnych: {activeCount}</span>
            <span>Ukończonych: {completedCount}</span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex gap-2 justify-center">
            {[
              { key: 'all', label: 'Wszystkie', count: tasks.length },
              { key: 'active', label: 'Aktywne', count: activeCount },
              { key: 'completed', label: 'Ukończone', count: completedCount }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {filter === 'all' && ' Brak zadań. Dodaj pierwsze zadanie!'}
              {filter === 'active' && ' Wszystkie zadania ukończone!'}
              {filter === 'completed' && ' Brak ukończonych zadań.'}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                    task.completed ? 'bg-green-50' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {task.completed && <Check size={14} />}
                  </button>
                  
                  <div className="flex-1">
                    <p className={`${
                      task.completed
                        ? 'text-gray-500 line-through'
                        : 'text-gray-800'
                    }`}>
                      {task.text}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Utworzono: {new Date(task.createdAt).toLocaleString('pl-PL')}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={clearCompleted}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 mx-auto"
            >
              <X size={20} />
              Usuń ukończone ({completedCount})
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Dane zapisywane lokalnie</p>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;