import React, { createContext, useRef } from "react";
import { GRID_INFO } from "./constants";

const Context = createContext();

const Provider = ({ children }) => {
  const grid = useRef(JSON.parse(JSON.stringify(GRID_INFO)));

  const resetGrid = () => {};
  const clearPath = () => {};
  const updateNode = () => {};

  return (
    <Context.Provider value={{ resetGrid, clearPath, updateNode }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
