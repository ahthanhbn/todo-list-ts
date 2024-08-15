import { useRef, useState } from "react";
import { defaultTodoList, filterTodoOptions } from "./constants";
import TodoList from "./components/TodoList";
import { Status, Todo } from "./types/Todo";

export default function App() {
  // TODO 8: Sau khi có state `status`, tạo 1 biến tên `filteredTodoList` để filter lại todoList với status tương ứng
  // Sau đó bỏ vào prop data của `TodoList` là `filteredTodoList`
  
  const [todoList, setTodoList] = useState<Todo[]>(defaultTodoList);
  const [searchText, setSearchText] = useState<string>("");
  const [status, setStatus] = useState<Status>("all");
  console.log("✅ ~ status:::", status);

  const filteredTodoList = todoList.filter((todo) => {
    if (status === "all") return true;
    if (status === "completed") return todo.isCompleted;
    if (status === "incomplete") return !todo.isCompleted;
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(searchText.trim() === "" ) return
    const newTodo = {
      id: crypto.randomUUID(),
      name: searchText,
      isCompleted: false,
    };

    setTodoList([newTodo, ...todoList]);
    setSearchText("");
    if(inputRef.current){
      inputRef.current.focus();
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatus(value as Status);
  };

  const handleCompleteTodo = (id: string) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      } else return todo;
    });
    setTodoList(newTodoList);
  };

  const handleDeleteTodo = (id: string) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <>
      <header>
        <h1>My To Do List</h1>
      </header>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          className="todo-input"
          ref={inputRef}
          value={searchText}
          onChange={ handleSearchTextChange}
        />
        <button className="todo-button" type="submit">
          <i className="fas fa-plus-circle fa-lg" />
        </button>
        <div className="select">
          <select
            name="todos"
            className="filter-todo"
            onChange={handleStatusChange}
          >
            {filterTodoOptions.map((todoOption) => {
              return (
                <option key={todoOption.value} value={todoOption.value}>
                  {todoOption.label}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <div className="todo-container">
        <TodoList
          todoList={filteredTodoList}
          onCompleteTodo={handleCompleteTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
    </>
  );
}
