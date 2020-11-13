import React from "react";
import { GRID_INFO } from "../constants";
import Node from "./Node";
import './grid.scss';

const Grid = () => {
  return (
    <div className="grid">
      {GRID_INFO.map((row, rowIndex) => (
        <div className="grid_row" key={rowIndex}>
          {row.map((col, colIndex) => (
            <Node
              rowIndex={rowIndex}
              colIndex={colIndex}
              key={rowIndex * 1000 + colIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
