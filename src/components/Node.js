import React, { useContext, useState } from "react";
import { Context } from "../Provider";
import { NODE_CLASSNAME } from "../constants";
import "./node.scss";

const Node = ({ row_index, col_index, curr_type }) => {
  // const [type, setType] = useState(curr_type);
  // const { gridNodesTypeSetterRef } = useContext(Context);

  // gridNodesTypeSetterRef.current[node_key] = setType;

  return (
    <div
      className={NODE_CLASSNAME}
      data-row_index={row_index}
      data-col_index={col_index}
      style={{
        backgroundColor: curr_type,
      }}
    />
  );
};

export default Node;
