import React from "react";
import './node.scss';

const Node = ({ rowIndex, colIndex }) => {
  return(
    <div 
      className="each_node"
      data-row_index={rowIndex}
      data-col_index={colIndex}
    />
  );
};

export default Node;
