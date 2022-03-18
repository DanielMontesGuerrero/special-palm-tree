import {agressiveBehaviour} from '../../config/behaviors/atack';
import {defensiveBehavior} from '../../config/behaviors/defense';
import {randomBasicAction} from '../../config/behaviors/random';
import BehaviorTree from './BehaviorTree';

type Behavior = 'random' | 'defense' | 'atack';

export default function createBehaviourTree(name: Behavior) {
  switch (name) {
    case 'atack':
      return new BehaviorTree(agressiveBehaviour);
    case 'defense':
      return new BehaviorTree(defensiveBehavior);
    case 'random':
    default:
      return new BehaviorTree(randomBasicAction);
  }
}
