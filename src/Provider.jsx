import React, { createContext, useRef } from "react";
import { GRID_INFO } from "./constants";
import { getStringKeyFromRowColIndexes } from "./helper";

const Context = createContext();

const Provider = ({ children }) => {
  /*
  * gridRef: 2D Array with node key<string>
  * nodeTypeSetterRef: Object; key: node key<string>, value: type setter<function>
  * 
  * 
  */
  
  const gridRef = useRef(JSON.parse(JSON.stringify(GRID_INFO)));
  const nodeTypeSetterRef = useRef({});

  const resetGrid = () => {};
  const clearPath = () => {};
  const updateNode = (rowNum, colNum, type) => {
    console.log('updateNode triggered');
    const nodeKey = getStringKeyFromRowColIndexes(rowNum, colNum);
    const setNodeType = nodeTypeSetterRef.current[nodeKey]
    setNodeType(type)
  };

  return (
    <Context.Provider value={{ resetGrid, clearPath, updateNode }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
