import clsx from "clsx";


interface TodoItemProps{
  name: string;
  isCompleted: boolean;
   onCompleteTodo: () => void;
   onDeleteTodo: () => void;
}
const TodoItem = (props: TodoItemProps) => {
  const { name, isCompleted, onCompleteTodo, onDeleteTodo } = props;

  return (
    <div
      className={clsx("todo", {
        completed: isCompleted,
      })}
    >
      {/* TODO 11: Thêm điều kiện cho className với prop là isCompleted */}
      <li className="todo-item">{name}</li>
      {/* TODO 9: Làm chức năng complete todo */}
      <button className="complete-btn" onClick={onCompleteTodo}>
        <i className="fas fa-check-circle" />
      </button>
      {/* TODO 10: Làm chức năng xóa todo */}
      <button className="trash-btn" onClick={onDeleteTodo}>
        <i className="fas fa-trash" />
      </button>
    </div>
  );
};

export default TodoItem;
