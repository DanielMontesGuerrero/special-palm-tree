import {randomBasicAction} from '../../config/behaviors/random';
import BehaviorTree from './BehaviorTree';

type Behavior = 'random';

export default function createBehaviourTree(name: Behavior) {
  switch (name) {
    case 'random':
    default:
      return new BehaviorTree(randomBasicAction);
  }
}
