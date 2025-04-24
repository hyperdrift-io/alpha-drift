import { FeatureVector } from '../types';

export class IdleRestakeStrategy {
  restake(vector: FeatureVector): string {
    // Mock restake logic
    return 'Restaked idle funds';
  }
}

export * from './idleRestake';
