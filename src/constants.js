export const INITIAL_COLOR = "grey";

export const ROW_LENGTH = 15;
export const COL_LENGTH = 15;
export const INITIAL_NODE_STATE = { color: INITIAL_COLOR };

export const GRID_INFO = [...Array(ROW_LENGTH)].map(() =>
  Array(COL_LENGTH).fill(INITIAL_NODE_STATE)
);
