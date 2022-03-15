import {NodeType} from '../types';
import BehaviorTree from './BehaviorTree';
import Node from './Node';

export default function createBehaviourTree(name: string) {
  return new BehaviorTree(new Node(NodeType.ACTION, []));
}
