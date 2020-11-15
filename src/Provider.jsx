import React, { createContext, useRef } from "react";
import { GRID_INFO } from "./constants";

const Context = createContext();

const Provider = ({ children }) => {
  /*
   * gridNodesTypeRef: 2D Array with node key<string>
   * gridNodesTypeSetterRef: Object; key: node key<string>, value: type setter<function>
   *
   *
   */

  const gridNodesTypeRef = useRef(JSON.parse(JSON.stringify(GRID_INFO)));
  const gridNodesTypeSetterRef = useRef({});

  const resetGrid = () => {};
  const clearPath = () => {};
  const triggerNodeTypeSetter = (row_index, col_index, node_key, node_type) => {
    const setNodeType = gridNodesTypeSetterRef.current[node_key];
    gridNodesTypeRef.current[row_index][col_index] = node_type;
    setNodeType(node_type);
  };

  return (
    <Context.Provider
      value={{
        resetGrid,
        clearPath,
        triggerNodeTypeSetter,
        gridNodesTypeSetterRef,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
