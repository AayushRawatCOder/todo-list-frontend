import React, { useContext, useEffect, useState } from "react";
import styles from "./Todo.module.css";
import { TodoContext } from "../context/TodoContext";

const reactTodo = "TO-DO";

export const Todo = () => {
  const { Alltodos, dispatch } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState({ type: null, index: null });
  const [taskInput, setTaskInput] = useState("");

  // ✅ Save tasks whenever `Alltodos` changes
  useEffect(() => {
    if (Alltodos) {
      localStorage.setItem(reactTodo, JSON.stringify(Alltodos));
    }
  }, [Alltodos]);

  const today = new Date().toLocaleDateString();
  const tomorrow = new Date(
    new Date().setDate(new Date().getDate() + 1)
  ).toLocaleDateString();

  function handleAddTask(type) {
    if (!taskInput.trim()) return;

    dispatch({
      type: type === "Today" ? "ADDTODAY" : "ADDTOMORROW",
      payload: { text: taskInput, completed: false }, // Store as object
    });

    setTaskInput("");
  }

  function handleEditClick(type, index) {
    setIsEditing({ type, index });
  }

  const handleEditTask = (event, index, type) => {
    const updatedTasks = [...Alltodos[type]];
    updatedTasks[index] = { ...updatedTasks[index], text: event.target.value }; // Update text only

    dispatch({
      type: `UPDATE${type.toUpperCase()}`,
      payload: { tasks: updatedTasks },
    });
  };

  const handleUpdate = () => {
    setIsEditing({ type: null, index: null });
  };

  function handleDeleteTask(type, index) {
    const updatedTasks = Alltodos[type].filter((_, i) => i !== index);

    dispatch({
      type: `UPDATE${type.toUpperCase()}`,
      payload: { tasks: updatedTasks },
    });
  }

  function handleToggleComplete(type, index) {
    dispatch({
      type: "TOGGLE_COMPLETE",
      payload: { type, index },
    });
  }
  // function handleUpdateComplete(tasks) {
  //   const updatedTasks = Alltodos[type].filter((_, i) => i !== index);
  //   dispatch({
  //     type: "UPDATECOMPLETE",
  //     payload: { tasks : updatedTasks},
  //   });
  // }
  
  
  return (
    <div className={styles.todoContainer}>
  <h1 className={styles.title}>TO-DO LIST</h1>

  <input
    type="text"
    placeholder="Enter Your Task"
    className={styles.input}
    value={taskInput}
    onChange={(e) => setTaskInput(e.target.value)}
  />

  <div className={styles.buttonContainer}>
    <button onClick={() => handleAddTask("Today")} className={styles.button}>
      Add to Today's Task
    </button>
    <button onClick={() => handleAddTask("Tomorrow")} className={styles.button}>
      Add to Tomorrow's Task
    </button>
  </div>
       <div className={styles.tasksWrapper}>
        {/* ✅ COMPLETED TASKS */}
        <div className={styles.tasksContainer}>
          <h2>Completed Tasks</h2>
          <ul>
            {Array.isArray(Alltodos?.Completed) &&
              Alltodos.Completed.map((task, index) => (
                <li key={index} className={styles.listItem}>
                  ✅ <span className={styles.completedTask}>{task.text}</span>
                  <button
                      onClick={() => handleUpdateComplete("Completed", index)}
                      className={styles.button}
                    >
                      Delete
                    </button>
                </li>
              ))}
          </ul>
        </div>
  
        {/* ✅ TODAY'S TASKS */}
        <div className={styles.tasksContainer}>
          <h2>Today's Tasks ({today})</h2>
          <ul>
            {Alltodos?.Today?.map((Task, index) => (
              <li key={index} className={styles.listItem}>
                {isEditing.type === "Today" && isEditing.index === index ? (
                  <>
                    <input
                      type="text"
                      value={Task.text}
                      onChange={(e) => handleEditTask(e, index, "Today")}
                      className={styles.input}
                    />
                    <button onClick={handleUpdate} className={styles.button}>
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      checked={Task.completed}
                      onChange={() => handleToggleComplete("Today", index)}
                    />
                    <span className={Task.completed ? styles.completedTask : ""}>
                      {Task.text}
                    </span>
  
                    <button
                      onClick={() => handleEditClick("Today", index)}
                      className={styles.button}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask("Today", index)}
                      className={styles.button}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
  
        {/* ✅ TOMORROW'S TASKS */}
        <div className={styles.tasksContainer}>
          <h2>Tomorrow's Tasks ({tomorrow})</h2>
          <ul>
            {Alltodos?.Tomorrow?.map((Task, index) => (
              <li key={index} className={styles.listItem}>
                {isEditing.type === "Tomorrow" && isEditing.index === index ? (
                  <>
                    <input
                      type="text"
                      value={Task.text}
                      onChange={(e) => handleEditTask(e, index, "Tomorrow")}
                      className={styles.input}
                    />
                    <button onClick={handleUpdate} className={styles.button}>
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      checked={Task.completed}
                      onChange={() => handleToggleComplete("Tomorrow", index)}
                    />
                    <span className={Task.completed ? styles.completedTask : ""}>
                      {Task.text}
                    </span>
  
                    <button
                      onClick={() => handleEditClick("Tomorrow", index)}
                      className={styles.button}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask("Tomorrow", index)}
                      className={styles.button}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
  
};
