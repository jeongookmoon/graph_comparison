import React, { useState } from "react";
import {
  GRID_INFO,
  EMPTY_NODE,
  WALL_NODE,
  START_NODE,
  START_NODE_POSITION_INFO,
  END_NODE,
  END_NODE_POSITION_INFO,
  NODE_CLASSNAME,
} from "../constants";
import Node from "./Node";
import "./grid.scss";

const Grid = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [grid, setGrid] = useState(GRID_INFO);
  const [replaceNodeType, setReplaceNodeType] = useState("");
  const [startNodePosition, setStartNodePosition] = useState(
    START_NODE_POSITION_INFO
  );
  const [endNodePosition, setEndNodePosition] = useState(
    END_NODE_POSITION_INFO
  );

  const onMouseDown = (event) => {
    // to prevent firing drag action
    event.preventDefault();

    const { row_index, col_index } = event.target.dataset;
    const { curr_type } = grid[row_index][col_index];
    setIsMouseDown(true);

    const newNodeType = getReplaceNodeType(curr_type);
    setReplaceNodeType(newNodeType);
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
      default:
        break;
    }
    return newNodeType;
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

    updateGridWithReplaceNodeType(row_index, col_index);
    // triggerNodeTypeSetter(row_index, col_index, node_key, newNodeType);
  };

  const updateGridWithReplaceNodeType = (currentRow, currentCol) => {
    const newGrid = grid.slice();
    const currentNode = newGrid[currentRow][currentCol];
    const { curr_type } = currentNode;

    // stop if replacing start/end node or replace wall node with start/end node
    if (curr_type === START_NODE || curr_type === END_NODE) return;
    if (
      (curr_type === WALL_NODE && replaceNodeType === START_NODE) ||
      (curr_type === WALL_NODE && replaceNodeType === END_NODE)
    )
      return;

    // update old start/end node's type
    switch (replaceNodeType) {
      case START_NODE:
        const startNodeRow = startNodePosition.row_index;
        const startNodeCol = startNodePosition.col_index;

        const nodeAtStart = grid[startNodeRow][startNodeCol];
        const nodeAtStart_Updated = {
          ...nodeAtStart,
          curr_type: EMPTY_NODE,
          prev_type: nodeAtStart.curr_type,
        };
        newGrid[startNodeRow][startNodeCol] = nodeAtStart_Updated;

        setStartNodePosition({ row_index: currentRow, col_index: currentCol });
        break;
      case END_NODE:
        const endNodeRow = endNodePosition.row_index;
        const endNodeCol = endNodePosition.col_index;

        const nodeAtEnd = grid[endNodeRow][endNodeCol];
        const nodeAtEnd_Updated = {
          ...nodeAtEnd,
          curr_type: EMPTY_NODE,
          prev_type: nodeAtEnd.curr_type,
        };
        newGrid[endNodeRow][endNodeCol] = nodeAtEnd_Updated;

        setEndNodePosition({ row_index: currentRow, col_index: currentCol });
        break;
      default:
        break;
    }

    // update current node
    const replaceNode = {
      ...currentNode,
      curr_type: replaceNodeType,
    };
    newGrid[currentRow][currentCol] = replaceNode;

    setGrid(newGrid);
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
