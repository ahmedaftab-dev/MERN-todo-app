import { useState } from "react";
import { CheckSquare, Plus, Search, Trash2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: "work" | "personal" | "health";
  priority: "low" | "medium" | "high";
  dueDate: string;
}

const Home = () => {
  // States
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "work" | "personal" | "health">("all");
  const navigate=useNavigate()

  // Add Todo
  const addTodo = () => {
    if (!newTodo.trim()) return;
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      category: ["work", "personal", "health"][Math.floor(Math.random() * 3)] as Todo["category"],
      priority: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as Todo["priority"],
      dueDate: new Date().toLocaleDateString(),
    };
    setTodos([todo, ...todos]);
    setNewTodo("");
  };

  // Toggle Complete
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Delete Todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // Category Color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "work":
        return "bg-blue-100 text-blue-700";
      case "personal":
        return "bg-pink-100 text-pink-700";
      case "health":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Priority Color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Filtered Todos
  const filteredTodos = todos.filter((t) => {
    const matchesCategory =
      selectedCategory === "all" || t.category === selectedCategory;
    const matchesSearch = t.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TodoMaster
              </span>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium hidden sm:block">
                Welcome back!
              </span>
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Your Tasks
          </h1>
          <p className="text-gray-600">
            Stay organized and productive with your personal todo list
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="text-3xl font-bold">{todos.length}</div>
            <div className="text-blue-100">Total Tasks</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="text-3xl font-bold">
              {todos.filter((t) => t.completed).length}
            </div>
            <div className="text-green-100">Completed</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="text-3xl font-bold">
              {todos.filter((t) => !t.completed).length}
            </div>
            <div className="text-orange-100">Pending</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="text-3xl font-bold">
              {Math.round(
                (todos.filter((t) => t.completed).length / todos.length) * 100
              ) || 0}
              %
            </div>
            <div className="text-purple-100">Progress</div>
          </div>
        </div>

        {/* Add Todo */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Add New Task
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="What needs to be done?"
            />
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Search tasks..."
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              {["all", "work", "personal", "health"].map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(
                      category as "all" | "work" | "personal" | "health"
                    )
                  }
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Your Tasks ({filteredTodos.length})
            </h3>

            {filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No tasks found</p>
                <p className="text-gray-400">
                  Add a new task to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                      todo.completed
                        ? "bg-gray-50 border-gray-200 opacity-75"
                        : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                          todo.completed
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-300 hover:border-blue-500"
                        }`}
                      >
                        {todo.completed && (
                          <CheckSquare className="w-4 h-4" />
                        )}
                      </button>

                      {/* Task Content */}
                      <div className="flex-1">
                        <div
                          className={`font-medium ${
                            todo.completed
                              ? "line-through text-gray-500"
                              : "text-gray-800"
                          }`}
                        >
                          {todo.text}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(
                              todo.category
                            )}`}
                          >
                            {todo.category}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(
                              todo.priority
                            )}`}
                          >
                            {todo.priority}
                          </span>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {todo.dueDate}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;