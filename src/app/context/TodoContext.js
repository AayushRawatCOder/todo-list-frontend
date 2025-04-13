"use client";
import React, { createContext, useReducer } from "react";
import { TodoReducer } from "./ToDoReducer";


export const TodoContext = createContext();
const initialState = {
  Today: [],
  Tomorrow: [],
  Completed: [], // ✅ Ensure this exists
};

const getInitialState = () => {
  const storedTodos = localStorage.getItem("TO-DO");
  return storedTodos ? JSON.parse(storedTodos) : { Today: [], Tomorrow: [] };
};

export const TodoProvider = ({ children }) => {
  const [Alltodos, dispatch] = useReducer(TodoReducer, getInitialState());

  return (
    <TodoContext.Provider value={{ Alltodos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
