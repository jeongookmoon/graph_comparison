import React from "react";
import { GRID_INFO } from "../constants";
import { getStringKeyFromRowColIndexes } from "../helper";
import Node from "./Node";
import "./grid.scss";

const Grid = () => {
  const getClickPosition = (event) => {};
  const onClick = (event) => {};

  return (
    <div className="container">
      <div className="grid" onClick={onClick}>
        {GRID_INFO.map((row_nodes, row_index) => (
          <div className="grid_row" key={row_index}>
            {row_nodes.map((a_node, col_index) => (
              <Node
                row_index={row_index}
                col_index={col_index}
                key={getStringKeyFromRowColIndexes(row_index, col_index)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
