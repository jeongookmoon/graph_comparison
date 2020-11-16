const separator = "x";
export const getStringKeyFromRowColIndexes = (rowNum, colNum) =>
  rowNum.toString() + separator + colNum.toString();

export const getRowAndColIndexesObjectFromStringKey = (key) => {
  const row_col_indexes = key.split(separator);
  return {
    row_index: parseInt(row_col_indexes[0]),
    col_index: parseInt(row_col_indexes[1]),
  };
};
