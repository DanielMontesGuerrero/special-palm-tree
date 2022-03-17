import {defensiveBehavior} from '../../config/behaviors/defense';
import {randomBasicAction} from '../../config/behaviors/random';
import BehaviorTree from './BehaviorTree';

type Behavior = 'random' | 'defense';

export default function createBehaviourTree(name: Behavior) {
  switch (name) {
    case 'defense':
      return new BehaviorTree(defensiveBehavior);
    case 'random':
    default:
      return new BehaviorTree(randomBasicAction);
  }
}
