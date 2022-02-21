import "./App.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
  const [goals, setGoals] = useState([]);
  const [showGoals, setShowGoals] = useState(true);
  const [goalExist, setGoalExist] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [added, setAdded] = useState(false);

  const goalInput = useRef(null);

  let jsonHandler = (data) => {
    let todos = Object.entries(data).map(([key, value]) => {
      return {
        ...value,
        key,
      };
    });

    setGoals(todos);
  };

  const postGoal = (e, inputRef) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/goals", { text: inputRef })
      .then((res) => setAdded(true));

    setAdded(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/goals")
      .then((res) => {
        jsonHandler(res.data);
        if (res.data) {
          setGoalExist(true);
        } else {
          setGoalExist(false);
        }
      })
      .catch((err) => console.log(err));
  }, [added, deleted]);

  const deleteGoal = (e, goalId) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/goals/${goalId}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => console.log(err));
    setDeleted(false);
  };

  const styles = {
    button:
      "ring-[3px] ml-7 ring-blue-500 px-12 text-blue-100 hover:bg-blue-900 bg-blue-800 py-3 rounded-full",
    deleteButton:
      "ring-[2px] ml-7 ring-red-500 px-8 text-red-100 hover:bg-red-900 bg-red-800 py-2 rounded-full",
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="App">
        <div className="postDiv pb-10">
          <h1 className="text-7xl pt-20 mb-10 text-white text-blue-600">
            Add a Goal
          </h1>
          <input
            className="rounded-2xl px-4 py-2 w-1/4 bg-blue-900 text-gray-100 placeholder:text-gray-300 border-none  focus:ring-[1.5px] focus:outline-none focus:border-none focus:ring-blue-500 "
            type="text"
            ref={goalInput}
            placeholder="Write Goal..."
          />
          <button
            onClick={(e) => {
              postGoal(e, goalInput.current.value);
            }}
            className={styles.button}
          >
            Add
          </button>
        </div>
        <h2 className="mt-6 mb-12 text-blue-400 text-5xl">See your Goals</h2>
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowGoals(true);
          }}
          className={styles.button}
        >
          Show 👓
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setShowGoals(false);
          }}
          className={styles.button}
        >
          Hide 🙈{" "}
        </button>

        {showGoals && goalExist ? (
          goals.map((goal) => {
            return (
              <div key={goal.key}>
                <h1 className="text-blue-400 text-[1.5rem] font-semibold mb-6 mt-7 flex flex-col justify-center items-center">
                  {goal.text}
                </h1>
                <button
                  onClick={(e) => deleteGoal(e, goal._id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            );
          })
        ) : (
          <h2 className="text-blue-400 text-4xl font-semibold mt-14 flex flex-col justify-center items-center">
            No Goals
          </h2>
        )}
      </div>
    </div>
  );
}

export default App;
