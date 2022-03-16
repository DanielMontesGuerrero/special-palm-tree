import {NodeType} from '../types';
import {ActionContext} from './actions';

interface Node {
  type: NodeType;
  childs: Node[];
  action: (ctx: ActionContext) => number;
}

export default Node;
