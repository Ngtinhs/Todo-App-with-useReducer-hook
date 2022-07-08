
import { useReducer, useRef } from "react";

const initState = {
  task: "",
  listTask: []
};

const SET_TASK = "set-task";
const ADD_TASK = "add-task";
const DELETE_TASK = "delete-task";

const setTask = (payload) => {
  return {
    type: SET_TASK,
    payload
  };
};

const addTask = () => {
  return {
    type: ADD_TASK
  };
};

const deleteTask = (id) => {
  return {
    type: DELETE_TASK,
    id
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TASK:
      return {
        ...state,
        task: action.payload
      };

    case ADD_TASK:
      return {
        listTask: [...state.listTask, state.task],
        task: ""
      };

    case DELETE_TASK:
      return {
        ...state,
        listTask: state.listTask.filter((item, index) => index !== action.id)
      };

    default:
      throw new Error("Invalid action!!!");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { task, listTask } = state;
  const inputRef = useRef();

  const handleSubmit = () => {
    dispatch(addTask());
    inputRef.current.focus();
  };

  return (
    <div className="App">
      <input
        placeholder="Enter task"
        value={task}
        onChange={(e) => dispatch(setTask(e.target.value))}
        ref={inputRef}
      />
      <button onClick={(e) => handleSubmit()}>Add</button>

      <ul>
        {listTask.map((item, index) => (
          <li key={index}>
            {item}
            <span
              onClick={(e) => {
                dispatch(deleteTask(index));
              }}
            >
              &times;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
