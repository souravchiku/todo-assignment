import { useEffect, useState } from "react";
import "./styles.css";
export default function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  function handlesubmit(e) {
    e.preventDefault();

    let newList = {
      id: new Date().getTime(),
      text: todo,
      completed: false
    };
    setTodos([...todos].concat(newList));
    setTodo("");
  }

  function reset(e) {
    e.preventDefault();
    setTodos([]);
    setTodo("");
  }

  return (
    <div className="App">
      <h4>To do list</h4>
      <button
        style={{ marginRight: "20px", color: "#e0f2f1 teal lighten-5" }}
        className="waves-teal btn right "
        onClick={reset}
      >
        <i class="material-icons left">refresh</i>Reset all task
      </button>
      <div className="row">
        <form className="col s12" onSubmit={handlesubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                styles={{ margin: "20px", padding: "0 20px" }}
                id="email"
                type="text"
                className="validate"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
              <label id="DITBT" for="email">
                <i class="material-icons">add</i> Add a Task{" "}
              </label>
            </div>
          </div>
        </form>
      </div>
      <div
        style={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {todos.map((item) => {
          return (
            <div className="todo-text">
              {/* {console.log(item.completed)} */}
              <p>
                <label>
                  <input name="group1" type="radio" />
                  <span>{item.text}</span>
                </label>
              </p>
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
}
