import {NodeType} from '../types';

export default class Node {
  type: NodeType;

  // eslint-disable-next-line no-use-before-define
  childs: Node[];

  action: () => number;

  constructor(type: NodeType, childs: Node[], action = () => -1) {
    this.type = type;
    this.childs = childs;
    this.action = action;
  }
}
