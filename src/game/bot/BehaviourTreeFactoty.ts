import {randomBasicAction} from '../../config/behaviors/random';
import BehaviorTree from './BehaviorTree';

export default function createBehaviourTree(name: string) {
  switch (name) {
    case 'random':
    default:
      return new BehaviorTree(randomBasicAction);
  }
}
