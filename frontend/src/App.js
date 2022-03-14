import './App.css'
import TodoManager from "./components/TodoManager"
import { create, deleteAll, getAll, put } from './components/TodoService';

function App() {
  return (
    <TodoManager getAll={getAll} create={create} put={put} delete={deleteAll} />
  );
}

export default App;
