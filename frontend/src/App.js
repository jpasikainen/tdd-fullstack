import './App.css'
import TodoManager from "./components/TodoManager"
import { getAll } from './components/TodoService';

function App() {
  return (
    <TodoManager getAll={getAll} />
  );
}

export default App;
