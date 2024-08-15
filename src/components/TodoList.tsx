import TodoItem from "./TodoItem";
import { Todo } from "../types/Todo";

interface TodoListProp{
  todoList : Todo[];
  onCompleteTodo : (id : string) => void;
  onDeleteTodo : (id:string) => void;
}
const TodoList = (props: TodoListProp) => {
  const{todoList, onCompleteTodo,onDeleteTodo} = props
  return (
    <div className="todo-list">
      {todoList.map((todoItem) => {
        return (
          <TodoItem
            key={todoItem.id}
            name={todoItem.name}
            isCompleted={todoItem.isCompleted}
            onCompleteTodo={() => onCompleteTodo(todoItem.id)}
            onDeleteTodo={() => onDeleteTodo(todoItem.id)}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
