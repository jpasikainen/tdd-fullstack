import './App.css'
import TodoManager from "./components/TodoManager"
import { create, getAll, put } from './components/TodoService';

function App() {
  return (
    <TodoManager getAll={getAll} create={create} put={put} />
  );
}

export default App;
