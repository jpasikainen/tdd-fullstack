import './App.css'
import TodoManager from "./components/TodoManager"
import { getAll } from './todoService';

function App() {
  return (
    <TodoManager getAll={getAll} />
  );
}

export default App;
