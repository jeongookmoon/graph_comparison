import React, { useContext, useState } from "react";
import { Context } from "../Provider";
import { getStringKeyFromRowColIndexes } from "../helper";
import "./node.scss";

const Node = ({ row_index, col_index }) => {
  const [type, setType] = useState("");
  const { nodeTypeSetterRef } = useContext(Context);
  const nodeKey = getStringKeyFromRowColIndexes(row_index, col_index);

  nodeTypeSetterRef.current[nodeKey] = setType;
  return (
    <div
      className="each_node"
      data-row_index={row_index}
      data-col_index={col_index}
    />
  );
};

export default Node;
