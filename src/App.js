import { useEffect, useState } from "react";
import "./styles.css";
export default function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [completed, setCompleted] = useState([]);
  const [bool, setBool] = useState(false);

  useEffect(() => {
    let json = localStorage.getItem("todos");
    let json2 = localStorage.getItem("completed");
    let completed2 = JSON.parse(json2);
    let loadedTodos = JSON.parse(json);
    if (loadedTodos || completed2) {
      setTodos(loadedTodos);
      setCompleted(completed2);
    }
    if (completed2.length >= 1) {
      setBool(true);
    }
  }, []);

  useEffect(() => {
    let json = JSON.stringify(todos);
    let json2 = JSON.stringify(completed);
    localStorage.setItem("completed", json2);
    localStorage.setItem("todos", json);
  }, [todos]);

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
    setCompleted([]);
    setBool(false);
  }

  function completedButton(id, item) {
    // setCompleted([...completed].concat(item))
    console.log(item);

    let updatedlist = [...todos].map((item) => {
      if (item.id === id) {
        item.completed = true;
      }
    });
    setTodos(updatedlist);
    console.log(item);
  }

  function handleradio(item) {
    setBool(true);
    let key = item.id;
    console.log("helo handle", item, key, todos);
    setCompleted([...completed].concat(item));
    console.log(completed);
    let updatedtodos = todos.filter((item) => item.id !== key);

    console.log(updatedtodos);
    setTodos(updatedtodos);
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
          display: "flex",
          flexDirection: "column"
        }}
      >
        {todos.map((item) => {
          return (
            <div className="todo-text" key={item.id}>
              {/* {console.log(item.completed)} */}
              <p>
                <label>
                  <input
                    name="group1"
                    type="radio"
                    onChange={() => handleradio(item)}
                  />
                  <span>{item.text}</span>
                </label>
              </p>
            </div>
          );
        })}
      </div>
      {bool ? (
        <div style={{ borderTop: "1px solid grey" }}>
          <h5 id="completed">Completed</h5>
          {completed.map((val) => {
            return (
              <div className="todo-text" key={val.id}>
                <p>
                  <label>
                    <input type="checkbox" checked="true" />
                    <span>{val.text}</span>
                  </label>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
