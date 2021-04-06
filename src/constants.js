import { getStringKeyFromRowColIndexes } from "./helper";
export const NODE_TYPES = {
  EMPTY_NODE: "#F8F8F8",
  WALL_NODE: "#DBD56E",
  START_NODE: "#d5cad6",
  END_NODE: "#edbfb7",
  REVIEWED_NODE: "#e3e3e3",
  UNDER_REVIEW_NODE: "UNDER_REVIEW",
  SOLUTION_NODE: "#CBDFBD",
};

export const {
  EMPTY_NODE,
  WALL_NODE,
  START_NODE,
  END_NODE,
  REVIEWED_NODE,
  UNDER_REVIEW_NODE,
  SOLUTION_NODE,
} = NODE_TYPES;
export const NODE_CLASSNAME = "each_node";

export const ROW_LENGTH = 20;
export const COL_LENGTH = 20;

export const START_NODE_POSITION_INFO = {
  row_index: Math.floor(ROW_LENGTH - ROW_LENGTH / 10) - 2,
  col_index: Math.floor(COL_LENGTH / 10),
};

export const END_NODE_POSITION_INFO = {
  row_index: Math.floor(ROW_LENGTH / 10),
  col_index: Math.floor(COL_LENGTH - COL_LENGTH / 10) - 2,
};

export const GRID_INFO = [];
for (let row_index = 0; row_index < ROW_LENGTH; row_index++) {
  GRID_INFO[row_index] = [];
  for (let col_index = 0; col_index < COL_LENGTH; col_index++) {
    let nodeType;
    if (
      row_index === START_NODE_POSITION_INFO.row_index &&
      col_index === START_NODE_POSITION_INFO.col_index
    )
      nodeType = START_NODE;
    else if (
      row_index === END_NODE_POSITION_INFO.row_index &&
      col_index === END_NODE_POSITION_INFO.col_index
    )
      nodeType = END_NODE;
    else nodeType = EMPTY_NODE;

    GRID_INFO[row_index][col_index] = {
      curr_type: nodeType,
      prev_type: EMPTY_NODE,
      node_key: getStringKeyFromRowColIndexes(row_index, col_index), // <string>
    };
  }
}

// export const GRID_INFO = [...Array(ROW_LENGTH)].map(() =>
//   Array(COL_LENGTH).fill({
//     curr_type: EMPTY_NODE,
//     prev_type: EMPTY_NODE,
//   })
// );
