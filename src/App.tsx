import { useState } from 'react';
import { ListTodo, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 p-4 sm:p-6 lg:p-8">
      <Card className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <ListTodo className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Todo List</h1>
          </div>

          <form onSubmit={addTodo} className="flex gap-2 mb-6">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1"
            />
            <Button type="submit">
              <PlusCircle className="h-5 w-5 mr-1" />
              Add
            </Button>
          </form>

          <div className="space-y-3">
            {todos.map(todo => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
              >
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                  {todo.text}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))}
            {todos.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-6">
                No todos yet. Add one above!
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default App;