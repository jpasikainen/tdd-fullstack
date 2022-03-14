import './App.css'
import TodoManager from "./components/TodoManager"
import { create, getAll } from './components/TodoService';

function App() {
  return (
    <TodoManager getAll={getAll} create={create} />
  );
}

export default App;
