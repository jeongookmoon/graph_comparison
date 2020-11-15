import React, { useContext, useState } from "react";
import { Context } from "../Provider";
import {
  GRID_INFO,
  EMPTY_NODE,
  WALL_NODE,
  START_NODE,
  START_NODE_POSITION,
  END_NODE,
  END_NODE_POSITION,
  NODE_CLASSNAME,
} from "../constants";
import Node from "./Node";
import "./grid.scss";

const Grid = () => {
  const context = useContext(Context);
  const { triggerNodeTypeSetter } = context;
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [grid, setGrid] = useState(GRID_INFO);
  const [replaceNodeType, setReplaceNodeType] = useState("");
  const [startNodePosition, setStartNodePosition] = useState(
    START_NODE_POSITION
  );
  const [endNodePosition, setEndNodePosition] = useState(END_NODE_POSITION);

  const onMouseDown = (event) => {
    // to prevent firing drag action
    event.preventDefault();

    const { row_index, col_index } = event.target.dataset;
    const { curr_type } = grid[row_index][col_index];
    setIsMouseDown(true);

    const newNodeType = getReplaceNodeType(curr_type);
    setReplaceNodeType(newNodeType);
    // updateNodeType(event);
  };

  const onMouseUp = () => {
    setIsMouseDown(false);
  };

  const onMouseMove = (event) => {
    if (!isMouseDown) return;
    updateNodeType(event);
  };

  // disable dragging once mouse leave grid component
  const onMouseLeave = () => {
    setIsMouseDown(false);
  };

  const onClick = (event) => {
    updateNodeType(event);
  };

  const updateNodeType = (event) => {
    const { row_index, col_index } = event.target.dataset;
    const { className } = event.target;
    if (className !== NODE_CLASSNAME) {
      setIsMouseDown(false);
      return;
    }
    if (
      (Number(row_index) === Number(startNodePosition.row_index) &&
        Number(col_index) === Number(startNodePosition.col_index)) ||
      (Number(row_index) === Number(endNodePosition.row_index) &&
        Number(col_index) === Number(endNodePosition.col_index))
    )
      return;

    const newGrid = getGridWithNewNode(row_index, col_index);
    setGrid(newGrid);

    // triggerNodeTypeSetter(row_index, col_index, node_key, newNodeType);
  };

  const getGridWithNewNode = (row_index, col_index) => {
    const newGrid = grid.slice();
    const currentNode = newGrid[row_index][col_index];
    const newNode = {
      ...currentNode,
      curr_type: replaceNodeType,
    };
    newGrid[row_index][col_index] = newNode;
    return newGrid;
  };

  const getReplaceNodeType = (clickedNodeType) => {
    let newNodeType = "";
    switch (clickedNodeType) {
      case EMPTY_NODE:
        newNodeType = WALL_NODE;
        break;
      case WALL_NODE:
        newNodeType = EMPTY_NODE;
        break;
      case START_NODE:
        newNodeType = START_NODE;
        break;
      case END_NODE:
        newNodeType = END_NODE;
        break;
    }
    return newNodeType;
  };

  return (
    <div className="container">
      <div
        className="grid"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {grid.map((row_nodes, row_index) => (
          <div className="grid_row" key={row_index}>
            {row_nodes.map((a_node, col_index) => (
              <Node
                row_index={row_index}
                col_index={col_index}
                curr_type={a_node.curr_type}
                prev_type={a_node.prev_type}
                key={a_node.node_key}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
