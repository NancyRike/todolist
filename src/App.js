import "./styles.css";
import { useState } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleAdd = (e) => {
    if (inputValue !== "") {
      setTodoItems((prev) => [
        ...prev,
        {
          item: inputValue,
          id: Math.floor(Math.random() * 1000),
          isCompleted: false
        }
      ]);
    } else return;
    setInputValue("");
  };

  const handleStrikeClick = (index) => {
    const newTasks = [...todoItems];
    newTasks[index].isCompleted = !todoItems[index].isCompleted;
    setTodoItems(newTasks);
  };
  const handleDelete = (removedItem) => {
    const output = todoItems.filter((todoItem, index) => {
      return index !== removedItem;
    });
    setTodoItems(output);
  };
  return (
    <div className="App">
      <div>
        <div className="header">
          <h2>To-do</h2>
        </div>
        <div className="todoContainer">
          <ul className="todoList">
            {todoItems.map((item, index) => {
              return (
                <TodoItems
                  key={item.id}
                  item={item.item}
                  handleDelete={() => handleDelete(index)}
                  handleStrikeClick={() => handleStrikeClick(index)}
                  activeState={item.isCompleted}
                />
              );
            })}
          </ul>
          <p>Add</p>
          <div className="inputActivity">
            <input type={"text"} value={inputValue} onChange={handleChange} />
            <button onClick={() => handleAdd()} className="addButton">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const TodoItems = ({ item, activeState, handleDelete, handleStrikeClick }) => {
  return (
    <li className="todoItems">
      <button onClick={handleStrikeClick} className="strikeButton">
        -
      </button>
      <p className={activeState ? "strikeThrough" : ""}>{item}</p>
      <button className="deleteButton" onClick={handleDelete}>
        X
      </button>
    </li>
  );
};
