import { START_NODE, END_NODE, WALL_NODE } from "../constants";
import { getRowAndColIndexesObjectFromStringKey } from "../helper";

class AstarNode {
  constructor(node_key, node_type) {
    this._key = node_key;
    this._type = node_type;
    // actual distance between parent and current node
    this._valueG = Infinity;
    // heuristic, direct distance between end and current node
    this._valueH = Infinity;
    // sum of g and h; priority distance. The lower the better
    this._valueF = this._valueG + this._valueH;
    this._neighbors = [];
    this._parentNode = null;
  }

  set key(newKey) {
    this._key = newKey;
  }

  get key() {
    return this._key;
  }

  set type(nodeType) {
    this._type = nodeType;
  }

  get type() {
    return this._type;
  }

  set valueG(value) {
    this._valueG = value;
    this.updateValueF();
  }

  get valueG() {
    return this._valueG;
  }

  set valueH(value) {
    this._valueH = value;
    this.updateValueF();
  }

  get valueH() {
    return this._valueH;
  }

  updateValueF() {
    this._valueF = this._valueG + this._valueH;
  }

  get valueF() {
    return this._valueF;
  }

  generateNeighbors(grid) {
    const { row_index, col_index } = getRowAndColIndexesObjectFromStringKey(
      this._key
    );

    const upperNode = row_index > 0 ? grid[row_index - 1][col_index] : null;
    // const bottomLeftNode =
    //   row_index > 0 && col_index > 0
    //     ? grid[row_index - 1][col_index - 1]
    //     : null;
    // const bottomRightNode =
    //   row_index > 0 && col_index < grid[0].length
    //     ? grid[row_index - 1][col_index + 1]
    //     : null;
    const bottomNode =
      row_index < grid[row_index] - 1 ? grid[row_index + 1][col_index] : null;
    // const upperLeftNode =
    //   row_index < grid[row_index] - 1 && col_index > 0
    //     ? grid[row_index + 1][col_index - 1]
    //     : null;
    // const upperRightNode =
    //   row_index < grid[row_index] - 1 && col_index < grid[0].length
    //     ? grid[row_index + 1][col_index + 1]
    //     : null;
    const leftNode = col_index > 0 ? grid[row_index][col_index - 1] : null;
    const rightNode =
      col_index < grid[0].length ? grid[row_index][col_index + 1] : null;

    if (bottomNode) this._neighbors.push(bottomNode);
    // if (bottomLeftNode && bottomLeftNode.type !== WALL_NODE)
    //   this._neighbors.push(bottomLeftNode);
    // if (bottomRightNode && bottomRightNode.type !== WALL_NODE)
    //   this._neighbors.push(bottomRightNode);
    if (upperNode) this._neighbors.push(upperNode);
    // if (upperLeftNode && upperLeftNode.type !== WALL_NODE)
    //   this._neighbors.push(upperLeftNode);
    // if (upperRightNode && upperRightNode.type !== WALL_NODE)
    //   this._neighbors.push(upperRightNode);
    if (leftNode) this._neighbors.push(leftNode);
    if (rightNode) this._neighbors.push(rightNode);
  }

  get neighbors() {
    return this._neighbors;
  }

  set parentNode(node) {
    this._parentNode = node;
  }

  get parentNode() {
    return this._parentNode;
  }
}

const getGridWithAstarNodes = (grid) => {
  const aStarGrid = [];
  for (let row_index = 0; row_index < grid.length; row_index++) {
    aStarGrid[row_index] = [];
    for (let col_index = 0; col_index < grid[0].length; col_index++) {
      const { node_key, curr_type } = grid[row_index][col_index];
      const aStarNode = new AstarNode(node_key, curr_type);

      if (curr_type === START_NODE) {
        aStarNode.valueG = 0.0;
        aStarNode.valueH = 0.0;
      } else if (curr_type === END_NODE) {
        aStarNode.valueH = 0.0;
      }

      aStarGrid[row_index][col_index] = aStarNode;
    }
  }
  return aStarGrid;
};

const setNeighborsPerNode = (grid) => {
  grid.forEach((rows) => {
    rows.forEach((node) => {
      node.generateNeighbors(grid);
    });
  });
};

const runAstar = (grid, startNodePosition, endNodePosition) => {
  // setup grid for Astar
  const aStarGrid = getGridWithAstarNodes(grid);
  setNeighborsPerNode(aStarGrid);

  // helpers
  let openList = [];
  const closedList = [];
  const visitedList = [];
  const solutionList = [];

  const startNode =
    aStarGrid[startNodePosition.row_index][startNodePosition.col_index];
  const endNode =
    aStarGrid[endNodePosition.row_index][endNodePosition.col_index];

  openList.push(startNode);
  while (openList.length > 0) {
    openList.sort((prevNode, currNode) =>
      prevNode.valueF < currNode.valueF ? -1 : 1
    );

    const lowestNode = openList.shift();
    if (lowestNode.type === WALL_NODE) continue;
    if (lowestNode === endNode) {
      let solutionNode = lowestNode;

      solutionList.push(solutionNode);
      while (solutionNode.parentNode) {
        solutionList.push(solutionNode.parentNode);
        solutionNode = solutionNode.parentNode;
      }

      return {
        visitedList,
        solutionList: solutionList.reverse(),
        notFound: false,
      };
    } else visitedList.push(lowestNode);

    closedList.push(lowestNode);

    // update openList
    const { neighbors } = lowestNode;
    for (let i = 0; i < neighbors.length; i++) {
      const neighborNode = neighbors[i];
      if (closedList.includes(neighborNode)) continue;

      const newValueG = heuristicManhattan(lowestNode, neighborNode);

      if (openList.includes(neighborNode) && newValueG < neighborNode.valueG) {
        const indexForUpdate = openList.findIndex(
          (element) => element === neighborNode
        );

        let nodeForUpdate = openList[indexForUpdate];
        nodeForUpdate.valueG = newValueG;
        nodeForUpdate.valueH = heuristicManhattan(nodeForUpdate, endNode);
        nodeForUpdate.updateValueF();
        nodeForUpdate.parentNode = lowestNode;

        openList[indexForUpdate] = nodeForUpdate;
      } else if (!openList.includes(neighborNode)) {
        neighborNode.valueG = newValueG;
        neighborNode.valueH = heuristicManhattan(neighborNode, endNode);
        neighborNode.updateValueF();
        neighborNode.parentNode = lowestNode;
        openList.push(neighborNode);
      }
    }
  }
  return { visitedList, solutionList: solutionList.reverse(), notFound: true };
};

// Ref: theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
const heuristicManhattan = (nodeA, nodeB) => {
  const nodeA_row = getRowAndColIndexesObjectFromStringKey(nodeA.key).row_index;
  const nodeA_col = getRowAndColIndexesObjectFromStringKey(nodeA.key).col_index;
  const nodeB_row = getRowAndColIndexesObjectFromStringKey(nodeB.key).row_index;
  const nodeB_col = getRowAndColIndexesObjectFromStringKey(nodeB.key).col_index;
  const dx = Math.abs(nodeA_row - nodeB_row);
  const dy = Math.abs(nodeA_col - nodeB_col);
  return dx + dy - 0.5 * Math.min(dx, dy);
  // return Math.abs(nodeA_row - nodeB_row) + Math.abs(nodeA_col - nodeB_col);
};

export default runAstar;
